import { ActionMeta, GroupTypeBase, Styles } from "react-select"

export type ReactSelectItemType = {
  label: string
  value: string
}

export type ReactSelectStyleType =
  | Partial<
      Styles<
        {
          value: string
          label: string
        },
        false,
        GroupTypeBase<{
          value: string
          label: string
        }>
      >
    >
  | undefined

export type ReactSelectOnChangeType = (
  value: ReactSelectItemType | null,
  action: ActionMeta<ReactSelectItemType>
) => void
