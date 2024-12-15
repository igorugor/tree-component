# Nested Folders

A test component accepting an array of items and displaying them in a tree.

## Requirements

-   All items must be clickable
-   If item is a folder, then it should become opened and display its children items. Else it should become focused
-   Items must have different icons depending on their file extension (".ts", ".js")
-   Change folder icon state depending on whether it's clicked or not. If it's file then it must have file icon

## What is done

-   All items are clickable
-   All types of items behave correctly
-   Item type identificator is implemented as text but not icon

## Run locally

```bash
# install dependencies
yarn
# run locally
yarn dev
```
