export class ClientsActionType {
  static SHOW_NEW_CLIENT_FORM = 'SHOW_CREATE_NEW_CLIENT_FORM' as const
  static SHOW_NEW_PET_FORM = 'SHOW_NEW_PET_FORM' as const
}

export class ClientsActionCreater {
  static createShowNewClientForm = (show: boolean) => {
    return {type: ClientsActionType.SHOW_NEW_CLIENT_FORM, pyload: show}
  }

  static createShowNewPetForm = (show: boolean) => {
    return {type: ClientsActionType.SHOW_NEW_PET_FORM, pyload: show}
  }
}

export type TAction =
  | ReturnType<typeof ClientsActionCreater.createShowNewClientForm>
  | ReturnType<typeof ClientsActionCreater.createShowNewPetForm>