import {RichUtils, EditorState, ContentState, SelectionState, Modifier, ContentBlock, convertFromRaw} from 'draft-js'
import {Map} from 'immutable'
import {IVisitsRaw} from '../redusers/petCardPageReduser'
import {Lib} from './lib'

export type TSimpleStyle = 'BOLD' | 'ITALIC' | 'UNDERLINE'

export class EditorUtils {
  static onSimpleStyle = (command: TSimpleStyle, editorState: EditorState): EditorState =>
    RichUtils.toggleInlineStyle(editorState, command)

  static onXorStyle = (command: string, commandList: string[], editorState: EditorState): EditorState => {
    const currentStyle = editorState.getCurrentInlineStyle().toArray()
    const oldStyle = currentStyle.filter(item => commandList.includes(item))[0]
    if (oldStyle !== command) {
      const oldEditorStateClear = RichUtils.toggleInlineStyle(editorState, oldStyle)
      return RichUtils.toggleInlineStyle(oldEditorStateClear, command)
    } else {
      return RichUtils.toggleInlineStyle(editorState, command)
    }
  }

  static onBlockStyle = (command: string, editorState: EditorState): EditorState =>
    RichUtils.toggleBlockType(editorState, command)

  static setBlockMetaData = (metaData: {[x: string]: string}, eState: EditorState) => {
    const newContentState = Modifier.mergeBlockData(eState.getCurrentContent(), eState.getSelection(), Map(metaData))
    return EditorState.createWithContent(newContentState)
  }

  static switchStyle = (style: any, callback: any, dispatch: any, styleList?: string[]) =>
    (_: any, e: React.MouseEvent) => {
    e.preventDefault()
    dispatch(callback(style, styleList))
  }

  static findXorStyle = (template: RegExp, editorState: EditorState) => editorState
    .getCurrentInlineStyle().toArray().filter(item => item ? item.match(template) : false)[0]

  static contentBlockArrayFromText = (text: string, styles: string[]) => {
    const dateRaf = ContentState.createFromText(text)
    const selectionDateRaf = SelectionState.createEmpty('').merge({
      anchorKey: dateRaf.getFirstBlock().getKey(),
      anchorOffset: 0,
      focusOffset: dateRaf.getLastBlock().getText().length,
      focusKey: dateRaf.getLastBlock().getKey(),
    })
    return styles.reduce((acc, item) =>
      Modifier.applyInlineStyle(acc, selectionDateRaf, item),
      dateRaf)
      .getBlocksAsArray()
  }

  static blockStyleFn = (...fans: Array<(block: ContentBlock) => string>) => (block: ContentBlock) =>
    fans.map(item => item(block)).join(' ')

  static blockFontSize = (block: ContentBlock) => {
    const blockType = block.getType()
    if (blockType === 'unordered-list-item' || blockType === 'ordered-list-item') {
      const inlineFontSizeStyle = block.getInlineStyleAt(0).toArray()
        .filter(item => item ? item.match(/FONT_SIZE/) : false)[0]
      return inlineFontSizeStyle
    }
    return ''
  }

  static blockTextAligen = (block: ContentBlock) => block.getData().get('textAlign')

  static createHistory = (visits: { [id: string]: IVisitsRaw }) => {
    const visitsArr = Object.values(visits).map(item => item)
    visitsArr.sort((a, b) => {
      const a1 = +Lib.dateFromString(a.shortData.date)
      const b1 = +Lib.dateFromString(b.shortData.date)
      return +a1 - +b1
    })
    return visitsArr.reduce((acc, item) => {
      const date = EditorUtils.contentBlockArrayFromText(
        `\n      ${item.shortData.date}  Врачь: ${item.shortData.doctor}      \n`,
        ['BOLD', 'FONT_SIZE_20', 'UNDERLINE'],
      )
      const descriptionText = EditorUtils.contentBlockArrayFromText(
        '\n     Описание лечения     \n',
        ['BOLD', 'FONT_SIZE_16', 'UNDERLINE'],
      )
      const description = convertFromRaw(JSON.parse(item.description)).getBlocksAsArray()
      const recommendationsText = EditorUtils.contentBlockArrayFromText(
        '\n     Рекомендации и назначения     \n',
        ['BOLD', 'FONT_SIZE_16', 'UNDERLINE'],
      )
      const recommendations = convertFromRaw(JSON.parse(item.recommendations)).getBlocksAsArray()
      return acc.concat(date, descriptionText, description, recommendationsText, recommendations)
    }, [] as ContentBlock[])
  }
}