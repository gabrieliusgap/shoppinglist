import React from 'react';
import {useState, useRef, useEffect} from 'react'

function Comp1() {
    let [titleFromInput, setTitleFromInput] = useState("")
    let [amountFromInput, setAmountFromInput] = useState([])
    let [priceFromInput, setPriceFromInput] = useState([])

    let [dataFromDB, setDataFromDB] = useState([])

    useEffect(()=> {

        fetch('http://localhost:8000/findProducts')
            .then(response => response.json())
            .then(data => setDataFromDB(data.data));


    },[])


    const titletext = useRef();
    const amounttext = useRef();
    const pricetext = useRef();


    function sendInfoToServer() {
        let infoSetFromInputs = {

            title: titleFromInput,
            amount: amountFromInput,
            price: priceFromInput,

        }


        const options1 = {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(infoSetFromInputs)
        }
        fetch(`http://localhost:8000/createObj`, options1).then(res => res.json())
            .then(data => {
                setDataFromDB(data.data)


            })
         titletext.current.value = "";
         amounttext.current.value = "";
         pricetext.current.value =  "";
    }

    function deleteFun(id){
        fetch(`http://localhost:8000/deleteProduct/`+id).then(res => res.json())
            .then(data => {
                setDataFromDB(data.data)


            })
    }
    function addFun(id){
        console.log("added pressed" +id)
        fetch(`http://localhost:8000/addProduct/`+id).then(res => res.json())
            .then(data => {
                setDataFromDB(data.data)


            })
    }

    function reduseFun(id){
        console.log("redused pressed"+id)
        fetch(`http://localhost:8000/reduceProduct/`+id).then(res => res.json())
            .then(data => {
                setDataFromDB(data.data)


            })
    }

    return (
        <div>
            <div className="inputHolder">
                <input ref={titletext} type="text" placeholder="Enter Title"
                       onChange={() => setTitleFromInput(titletext.current.value)}/>
                <input ref={amounttext} type="text" placeholder="Enter Amount"
                       onChange={() => setAmountFromInput(amounttext.current.value)}/>
                <input ref={pricetext} type="text" placeholder="Enter Price"
                       onChange={() => setPriceFromInput(pricetext.current.value)}/>

                <button className="button" onClick={sendInfoToServer}>Send Info To Server</button>

            </div>

            <div className="galleryHolder">
                {dataFromDB.map((item, index) =>
                    <div className="productCard" key={index}>
                        <div>{item.title}</div>
                        <div className="amountHolder">
                            <div onClick={()=>reduseFun(item._id)}><img src="https://lh3.googleusercontent.com/proxy/EfhL5A9-iyhAw-pNWHjIgJCtMbHwH5Ams8AyXsskxh0_HjOtVkufN8_FB0K8Yr-weOP4lzXaAL3waWuJsapLj0L_9lZsQBvd5Swis2W_kMEJCKRBfKjqk_-Y" alt="minus"/></div>
                            <div>Amount: {item.amount}</div>
                            <div onClick={()=>addFun(item._id)}><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Ambox_plus.svg/1024px-Ambox_plus.svg.png" alt="plus"/></div>
                        </div>
                        <div>Price: {item.price} $</div>
                        <div>Total: {item.amount * item.price} $</div>
                        <div onClick={()=>deleteFun(item._id)}><img src="https://i.pinimg.com/originals/51/98/0e/51980e816faddff3c59437a25b6172ca.jpg" alt="delete"/></div>
                    </div>
                )}

            </div>


        </div>
    );
}

export default Comp1;