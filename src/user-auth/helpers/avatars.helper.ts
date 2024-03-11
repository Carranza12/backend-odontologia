import * as path from "path";

export const renameImage = (req,file,callback) => {
    console.log("req.body:", req.body)
    const name = `${req.body.name}_${req.body.last_name}`;
    const extension = path.extname(file.originalname)
    
   
    console.log("NAME:", name)
    console.log(`${name}`)
    callback(null, `${name}${extension}`)
}

export const fileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error("TIPO DE FORMATO INVALIDO"), false);
    }
    callback(null, true);
};