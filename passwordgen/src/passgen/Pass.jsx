import { useCallback, useState, useEffect, useRef } from "react";

const GenPass = () => {
    const [pass, setPass] = useState("hello");
    const [num, setNum] = useState(false);
    const [char, setChar] = useState(false);
    const [len, setLen] = useState("8");    
    const useref = useRef('null');

    const handleIt = () => {
        useref.current?.select();
        useref.current?.setSelectionRange(0, len);
        window.navigator.clipboard.writeText(pass);
    }

    const genPassword = useCallback(()=> {
        let word = "abcdefghijklmnopqrstuvwABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let newPass = "";
        if (num) word += "0123456789";
        if (char) word += "`![]+-./;<=>?@#$%^&*(){}~";
        for(let i=0;i<len;i++) {
            const index = Math.floor(Math.random() * word.length + 1);
            newPass += word.charAt(index);
        }
        setPass(newPass);
        console.log("Changing");
    },[num, char, len, setPass]);

    useEffect(()=> {
        genPassword();
    }, [len, num, char, genPassword]);

    return <>
        <div className="flex justify-center text-black text-2xl">
            <input type="text" readOnly value={pass} ref={useref} className=" bg-gray-100 rounded-md p-2 font-extrabold"/>
            <button onClick={handleIt} className="bg-blue-800 p-2 ml-4 text-white rounded-sm hover:bg-blue-400">Copy</button>
        </div>
        <div className="flex justify-between mt-4 p-4 text-2xl">
            <label>
                <input type="range" min="8" max="100" value={len} onChange={(e)=> setLen(e.target.value)}></input> Length: {len}
            </label>
            <label >
                <input type="checkbox" onChange={()=> setNum((prev)=> !prev)} /> Number
            </label>
            <label >
                <input type="checkbox" onChange={()=> setChar((prev)=> !prev)}/> Char
            </label>
        </div>
    </>
}

export default GenPass;