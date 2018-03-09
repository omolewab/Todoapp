class ToDo {
    _id:string;
    id:string;
    title: string;
    description: string;
    date: Date;
    status: string;
    category: string;
    priority: string;
    

    constructor(
    ){
        this.title = "";
        this.description = "";
        this.date = new Date();
        this.status = "";
        this.category = "";
        this.priority = "";
        
       
    }
}

export default ToDo;