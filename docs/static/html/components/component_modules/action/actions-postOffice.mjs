import colorlog from '/static/html/components/component_modules/colorLog/colorLog.mjs'

function bestCopyEver(src) {
    return Object.assign({}, src);
}
export default (views,property,color,substrate,relation)=>{
    return  new Promise(async (resolve, reject) => {
        color = 'action'
        await colorlog(views,'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',color, substrate, relation )
        switch (relation.toLowerCase()) {
            case 'button':
                let json = (await Json(views))
                let selected = await json.select(substrate)
                let jsonTemplate = {}
                if(property.hasOwnProperty('property')){
                    jsonTemplate = await json.transformWith(property.property, false, selected)
                }else{
                    jsonTemplate = await json.transformWith(property, false, selected)
                }
                let button = await json.root(jsonTemplate)
                await colorlog(views,'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',color, button, relation )
                document.dispatchEvent( new CustomEvent('actionButton', {
                    detail: {
                        _:'button',
                        button
                    }
                }))
                break
            case 'player':
                (async (views,property,color,substrate,relation)=>{

                    let json = (await Json(views))
                    let selected = await json.select(substrate)
                    let jsonTemplate = {}
                    if(property.hasOwnProperty('property')){
                        jsonTemplate = await json.transformWith(property.property, false, selected)
                    }else{
                        jsonTemplate = await json.transformWith(property, false, selected)
                    }
                    let button = await json.root(jsonTemplate)
                    await colorlog(views,'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',color, button, relation )
                    document.dispatchEvent( new CustomEvent('actionButton', {
                        detail: {
                            _:'button',
                            button
                        }
                    }))

                })(views,property,color,substrate,relation)
                break
            case 'authtorization':
                (async (views,property,color,substrate,relation)=>{

                    console.assert(false, substrate)
               let login =   await fetch("https://api.dellin.ru/v1/customers/login.json", {
                       method: "POST",
                       headers: {
                           'mode': 'no-cors'
                       },
                       body: JSON.stringify(substrate)
                    });

                    login = await login.json()

                    console.assert(false, login)


                    // let json = (await Json(views))
                    // let selected = await json.select(substrate)
                    // let jsonTemplate = {}
                    // if(property.hasOwnProperty('property')){
                    //     jsonTemplate = await json.transformWith(property.property, false, selected)
                    // }else{
                    //     jsonTemplate = await json.transformWith(property, false, selected)
                    // }
                    // let button = await json.root(jsonTemplate)
                    // await colorlog(views,'~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',color, button, relation )
                    // document.dispatchEvent( new CustomEvent('actionButton', {
                    //     detail: {
                    //         _:'button',
                    //         button
                    //     }
                    // }))

                })(views,property,color,substrate,relation)
                break
            default:
                console.warn('actions-postoffice.mjs нет обработчика --->', relation.toLowerCase(), '[(' ,views,property,color,substrate,relation ,')a]')
                break
        }
        resolve({ key:true})
    })
}