import { useSelector, useDispatch } from 'react-redux';
import { del, set } from '../slices/userSlice';

    export function useSaveUserState(state) {
        let dispatch = useDispatch();
        try {
            dispatch(set(state));
        }
        catch (err) {
        }
    }

    export function useClearState() {
        let dispatch = useDispatch();
        try {
            dispatch(del());
        }
        catch (err) {
        }
    }

    export function useLoadState() {
        return useSelector((state) => state.user.user);
    }    
