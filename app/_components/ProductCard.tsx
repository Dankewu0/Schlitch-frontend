import {useState,useEffect} from "react";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {fetchData} from "@/lib/api";
export default function ProductCard(){
    const [isAdd, setIsAdd] = useState(false);
    const [serverResponse, setServerResponse] = useState<any>(null);
    useEffect(()=> {
        if(isAdd){
            fetchData("products", {
                method: "POST",
                body: JSON.stringify({ clicked: true }),
            })
                .then((data)=>{
                    setServerResponse(data);
                })
        }
    },[isAdd])
    return(
    <div className="bg-gray-100 w-300 h-250">
        <section className="w-[300px] h-[100px] relative">
            <Image
                src={imageUrl}
                alt="Картинка из бэкенда"
                fill
                style={{ objectFit: "cover" }}
            />
        </section>
        <section>
            <h1 className="BRAND-NAME "></h1>
            <h2 className="PRODUCT-NAME "></h2>
        </section>
        <section>
            <Button onClick={()=>setIsAdd(!isAdd)}>
                {isAdd ? "Добавлено" : "Добавить в корзину"}
            </Button>
        </section>
    </div>
)
}