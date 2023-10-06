import * as path from "path";

export const renameImage = (req,file,callback) => {
    const name = `${req.body.name}_${req.body.last_name}`;
    const extension = path.extname(file.originalname)
    
    const randonName = Array(4).fill(null).map(()=> Math.round(Math.random() * 16).toString(16));
    console.log(`${name}-${randonName}`)
    callback(null, `${name}-${randonName}${extension}`)
}

export const fileFilter = (req, file, callback) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
        return callback( new Error("TIPO DE FORMATO INVALIDO"), false )
    }
    callback(null,true);
}