exports.get = function(appName, component){
    return {
        app: removeBadChar("__"+appName + "_"),
        part: removeBadChar("__"+component.descriptor) + "_",
        local: removeBadChar("__"+component.descriptor + "_" + component.path + "_")
    }
}

var removeBadChar = function(ns)
{
    // Replace invalid characters with "_" char.
    return ns.replace(/[^a-z0-9_]/ig, '_')

}
