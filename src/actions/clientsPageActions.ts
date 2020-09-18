export class ClientsActionType {
  static SHOW_CREATE_NEW_CLIENT_FORM = 'SHOW_CREATE_NEW_CLIENT_FORM' as const
}

export class ClientsActionCreater {
  static createShowCreateNewClientForm = (show: boolean) => {
    return {type: ClientsActionType.SHOW_CREATE_NEW_CLIENT_FORM, pyload: show};
  }
}

export type TAction =
  | ReturnType<typeof ClientsActionCreater.createShowCreateNewClientForm>