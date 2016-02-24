var libs = {
    portal: require('/lib/xp/portal')
}

exports.get = function(appName, component){
    return {
        app: removeBadChar(appName),
        part: removeBadChar(component.descriptor),
        local: removeBadChar(component.descriptor + "_" + component.path)
    }
}

exports.getPageComponentsNamespaces = function(components){
    var componentsNamespaces = [];
    components.forEach(function(element,index,array){
        componentsNamespaces.push(
            {
                name: element.name,
                part: removeBadChar(element.descriptor),
                local: removeBadChar(element.descriptor + "_" + element.path),
                url: libs.portal.componentUrl({name:element.name,path:element.path})
            }
        );
    });
    return componentsNamespaces;
}


var removeBadChar = function(ns)
{
    return ns.replace(/[^a-z0-9_]/ig, '_');
}
