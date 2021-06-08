/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';
import {
    ItalicButton,
    BoldButton,
    UnderlineButton,
    CodeButton,
    HeadlineOneButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton,
} from 'draft-js-buttons';
import {stateToHTML} from 'draft-js-export-html';
import editorStyles from '../editorStyles.css';


class HeadlinesPicker extends Component {
    componentDidMount() {
        setTimeout(() => { window.addEventListener('click', this.onWindowClick); });
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.onWindowClick);
    }

    onWindowClick = () =>
        // Call `onOverrideContent` again with `undefined`
        // so the toolbar can show its regular content again.
        this.props.onOverrideContent(undefined);

    render() {
        const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];
        return (
            <div className='headlineButtonWrapper'>
                {buttons.map((Button, i) => // eslint-disable-next-line
                    <Button key={i} {...this.props} />
                )}
            </div>
        );
    }
}

class HeadlinesButton extends Component {
    onClick = () =>
        // A button can call `onOverrideContent` to replace the content
        // of the toolbar. This can be useful for displaying sub
        // menus or requesting additional information from the user.
        this.props.onOverrideContent(HeadlinesPicker);

    render() {
        return (
            <div className='headlineButtonWrapper'>
                <button onClick={this.onClick} className={editorStyles.headlineButton}>
                    <strong>H</strong>
                </button>
            </div>
        );
    }
}

const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;
const plugins = [toolbarPlugin];
const text = '';

export default class TextEditor extends Component {

    state = {
        editorState: createEditorStateWithText(text),
    };

    onChange = (editorState) => {
        this.setState({editorState});
        var html = stateToHTML(editorState.getCurrentContent());
        this.props.onChange(html);
    };

    focus = () => {
        this.editor.focus();
    };

    render() {
        return (
            <div>
                <div className='editor' onClick={this.focus}>
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        plugins={plugins}
                        ref={(element) => { this.editor = element; }}
                    />
                    <Toolbar className='editorToolbar'>
                        {
                            (externalProps) => {
                                return (<div className='editorToolbar'>
                                    <BoldButton {...externalProps} />
                                    <ItalicButton {...externalProps} />
                                    <UnderlineButton {...externalProps} />
                                    <CodeButton {...externalProps} />
                                    <Separator {...externalProps} />
                                    <HeadlinesButton {...externalProps} />
                                    <UnorderedListButton {...externalProps} />
                                    <OrderedListButton {...externalProps} />
                                    <BlockquoteButton {...externalProps} />
                                    <CodeBlockButton {...externalProps} />
                                </div>)
                            }
                        }
                    </Toolbar>
                </div>
            </div>
        );
    }
}