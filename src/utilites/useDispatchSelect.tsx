import {useDispatch, shallowEqual, useSelector} from 'react-redux';
import {Dispatch} from 'redux';

export const useDispatchSelect = <T, U>(selector: (state: U) => T) => {
  const partState: T = useSelector(selector, shallowEqual);
  const dispatch: Dispatch<any> = useDispatch();
  return {partState, dispatch};
};