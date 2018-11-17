import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import bonzo from 'bonzo';
import fastdom from 'fastdom';
import { scrollTo } from 'lib/scroller';
import { isBreakpoint } from 'lib/detect';

class HiddenInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
        };
    }

    componentDidUpdate() {
        if (
            isBreakpoint({
                max: 'mobile',
            })
        ) {
            fastdom.read(() => {
                const offsets = bonzo(findDOMNode(this.input)).offset();
                const clueHeight = document.getElementsByClassName(
                    'crossword__sticky-clue'
                )[0].offsetHeight;

                scrollTo(
                    offsets.top - offsets.height * 1.5 - clueHeight,
                    250,
                    'easeOutQuad'
                );
            });
        }
    }

    onClick(event) {
        this.props.crossword.onClickHiddenInput(event);
    }

    onKeyDown(event) {
        this.props.crossword.onKeyDown(event);
    }

    onBlur(event) {
        this.props.crossword.goToReturnPosition(event);
    }

    touchStart(event) {
        this.props.crossword.onClickHiddenInput(event);
    }

    handleChange(event) {
        this.props.crossword.insertCharacter(event.target.value);
        this.setState({
            value: '',
        });
    }

    render() {
        return (
            <div
                className="crossword__hidden-input-wrapper"
                ref={wrapper => {
                    this.wrapper = wrapper;
                }}>
                <input
                    type="text"
                    className="crossword__hidden-input"
                    maxLength="1"
                    onClick={this.onClick.bind(this)}
                    onChange={this.handleChange.bind(this)}
                    onTouchStart={this.touchStart.bind(this)}
                    onKeyDown={this.onKeyDown.bind(this)}
                    onBlur={this.onBlur.bind(this)}
                    value={this.state.value}
                    autoComplete="off"
                    spellCheck="false"
                    autoCorrect="off"
                    ref={input => {
                        this.input = input;
                    }}
                />
            </div>
        );
    }
}

export { HiddenInput };
