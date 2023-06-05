
type input = {
    children:string,
    handleOnchange : (event:React.ChangeEvent<HTMLInputElement>) => void
}

export const InputComponent = (props:input) => {
  return (
   <>
   <div className="inputComponent">
   <input type="text" onChange={props.handleOnchange}  placeholder={props.children}/>
   </div>
  
   </>
  )
}
