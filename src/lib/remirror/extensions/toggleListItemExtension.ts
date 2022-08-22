import React from 'react';
import { ExtensionTag, findParentNode, KeyBindingProps, KeyBindings, PlainExtension, ProsemirrorNode } from 'remirror';
import { wrapSelectedItems } from 'remirror/extensions';

function isListItemNode(node: ProsemirrorNode): boolean {
  return !!node.type.spec.group?.includes(ExtensionTag.ListItemNode);
}

export class ToggleListItemExtension extends PlainExtension {
  readonly name = 'toggleListItem';

  createKeymap(): KeyBindings {
    return {
      'Mod-Enter': (props): boolean => {
        return this.toggleListType(props);
      },
    };
  }

  private toggleListType({ state: { schema }, tr, dispatch }: KeyBindingProps): boolean {
    const foundListItem = findParentNode({
      selection: tr.selection,
      predicate: isListItemNode,
    });

    if (!foundListItem) {
      return false;
    }

    const { node: listItem } = foundListItem;

    const list = tr.doc.resolve(foundListItem.pos).parent;

    // cover ordered list item to bullet list item
    if (list.type.name === 'orderedList') {
      wrapSelectedItems({
        listType: schema.nodes.bulletList!,
        itemType: schema.nodes.listItem!,
        tr,
      });
      dispatch?.(tr);
      return true;
    }

    // cover bullet list item to unchecked task item
    else if (list.type.name === 'bulletList') {
      wrapSelectedItems({
        listType: schema.nodes.taskList!,
        itemType: schema.nodes.taskListItem!,
        tr,
      });
      dispatch?.(tr);
      return true;
    }

    // cover uncheck task item to checked task item
    else if (listItem.type.name === 'taskListItem' && !listItem.attrs.checked) {
      this.store.commands.toggleCheckboxChecked();
      return true;
    }

    // cover check task item to ordered list item
    else if (listItem.type.name === 'taskListItem' && !!listItem.attrs.checked) {
      wrapSelectedItems({
        listType: schema.nodes.orderedList!,
        itemType: schema.nodes.listItem!,
        tr,
      });
      dispatch?.(tr);
      return true;
    }

    return false;
  }
}
