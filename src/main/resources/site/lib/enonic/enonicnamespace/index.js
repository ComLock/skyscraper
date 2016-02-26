var libs = {
    portal: require('/lib/xp/portal')
}

exports.getNS = function(appName, component){
    return {
        app:exports.getAppNS(appName),
        part:exports.getPartNS(appName,component),
        local:exports.getLocalNS(component)
    }
};

exports.getAppNS = function(appName){
    return removeBadChar(appName);
};

exports.getPartNS = function(appName, component){
    log.info("app.name="+app.name);
    log.info("component="+libs.portal.getComponent());
    return removeBadChar(component.descriptor);
};

exports.getLocalNS = function(component){
    return removeBadChar(component.descriptor + "_" + component.path);
};

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
};

var removeBadChar = function(ns)
{
    return ns.replace(/[^a-z0-9_]/ig, '_');
};
