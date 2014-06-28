function runWithString(pattern) {
    if (!pattern) {
        notify("No search pattern was supplied.");
        return [];
    }

    var resp = parse_input(pattern);
    try {
        var args = resp.args.concat(['--nocolor', '--nobreak']);
        args.unshift(resp.ag);
        args.push(resp.pattern.join(' '));
        args.push(resp.args.concat(args.dirs));

        LaunchBar.log("CMD="+args.join(' '))
        var files = parse(LaunchBar.execute.apply(LaunchBar, args));

    } catch (err) {
        LaunchBar.displayNotification({title: "LaunchBar Error", string: err});
    }

    return [];
}

function runWithItem(item) {
    return [];
}

////////////////////////////////
function parse_input(input) {
    var in_str = input.split(' ');
    var result = {ag: "", args: [], dirs: [], pattern: []};

    if (Action.preferences.ag === undefined)
        Action.preferences.ag = "/usr/local/bin/ag";
    result.ag = Action.preferences.ag;

    if (Action.preferences.args === undefined)
        Action.preferences.args = ['--smart-case', '--sort-files'];
    result.args = Action.preferences.args;

    in_str.forEach(function(item) {
        if (item.indexOf('--') === 0)
            result.args.push(item);
        else if (File.isDirectory(item))
            result.dirs.push(item);
        else
            result.pattern.push(item);
    });

    return result;
}

function parse_output(output) {
    var lines = output.split("\n");
    var files = [];
    var file = {path: "", results: []};
    for (var i = 0, len = lines.length; i < len; i++) {
        lines[i] = lines[i].trim();
        if (!lines[i]) continue;

        if (is_file(lines[i])) {
            file = {title: lines[i], children: []};
        } else {}
    }
}

function is_file(line) {}
function is_match(line) {}
