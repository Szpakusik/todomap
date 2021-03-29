import { Request, Express } from "express"

const setupLogger = (app: Express) => {
  app.use(function (req: Request, res, next) {
    const d = new Date();
    const dateString = 
       d.getMonth()+1+"/"
      +d.getDate()+" "
      +d.getHours().toString().padStart(2, '0')+":"
      +d.getMinutes().toString().padStart(2, '0')+":"
      +d.getSeconds().toString().padStart(2, '0');
    console.log('\x1b[34m',"/"+req.method, 'Date:', dateString, "from", req.headers.origin, "\x1b")
    next()
  })
}

export default setupLogger