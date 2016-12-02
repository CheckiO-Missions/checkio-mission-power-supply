//Dont change it
//Dont change it
requirejs(['ext_editor_io', 'jquery_190'],
    function (extIO, $) {
        var io = new extIO({
            functions: {
                js: 'powerSupply',
                python: 'power_supply'
            },
            multipleArguments: true
        });
        io.start();
    }
);
