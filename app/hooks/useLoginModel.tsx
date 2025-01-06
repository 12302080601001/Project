import{ create} from 'zustand';
interface LoinModelStore{
    isOpen : boolean;
    onOpen: ()=> void;
    onClose: ()=> void;
}
const useLoginModel = create<LoginModelStore>((set)=>({
   onOpen: ()=> set({isOpen: true}),
    onClose: ()=> set({isOpen: false}),
}));
export default useLoginModel;