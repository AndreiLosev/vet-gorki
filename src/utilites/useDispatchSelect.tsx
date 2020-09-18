import {useDispatch, shallowEqual, useSelector} from 'react-redux';
import {AnyAction, Dispatch} from 'redux';

export const useDispatchSelect = <T, U>(selector: (state: U) => T) => {
  const partState: T = useSelector(selector, shallowEqual);
  const dispatch: Dispatch<AnyAction> = useDispatch();
  return {partState, dispatch};
};