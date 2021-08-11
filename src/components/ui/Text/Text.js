const PageHeader = (props) => {
   return (
      <h2 className={props.className}>
         {props.title}
      </h2>
   );
}
 
export  {
   PageHeader
};