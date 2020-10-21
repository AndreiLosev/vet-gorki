export class StaticDataActionType {
  static ADD_PET_TYPE = 'ADD_PET_TYPE' as const
  static REMOVE_PET_TYPE = 'REMOVE_PET_TYPE' as const
  static ADD_BREED = 'ADD_BREED' as const
  static REMOVE_BREED = 'REMOVE_BREED' as const
  static ADD_DIAGNOSES = 'ADD_DIAGNOSES' as const
  static REMOVE_DIAGNOSES = 'REMOVE_DIAGNOSES' as const
}

export class StaticDataActionCreater {
  static createAddPetType = (petType: string) =>
    ({ type: StaticDataActionType.ADD_PET_TYPE, pyload: petType })
  
  static createRemovePetType = (petsType: string[]) =>
    ({ type: StaticDataActionType.REMOVE_PET_TYPE, pyload: petsType })
  
  static createAddBreed = (breed: string) =>
    ({ type: StaticDataActionType.ADD_BREED, pyload: breed })
  
  static createRemoveBreed = (breeds: string[]) =>
    ({ type: StaticDataActionType.REMOVE_BREED, pyload: breeds })

  static createAddDiagnoses = (diagnose: string) =>
    ({ type: StaticDataActionType.ADD_DIAGNOSES, pyload: diagnose })
  
  static createRemoveDiagnoses = (diagnoses: string[]) =>
    ({ type: StaticDataActionType.REMOVE_DIAGNOSES, pyload: diagnoses })
}