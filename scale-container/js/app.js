window.onload = function() {
    picturePreload();
    res();
    $(window).resize(res);
};

function res() {
	$('.res').each(function() {
		response($(this));
	});
}


function response(obj) {
    var width = document.body.clientWidth;
    var height = document.body.clientHeight;

        var dWidth = obj.data('width');
        var dHeight = obj.data('height');
        var proportion = dWidth / dHeight;
        var dw;

        if ((width / height) > proportion) {
            dw = height * proportion;
        } else {
            dw = width;
        }
        obj.width(dw);

        var left = (width - dw) / 2;
        var top = (height - dw / proportion) / 2;

        obj.css({
            top: top,
            left: left
        });



}

function picturePreload() {
    $('.preload').each(function() {
        var $this = $(this);
        var src = $this.data('source');

        var img = $('<img>').attr({
            src: src,
            alt: ''
        });

        $this.append(img);
    });
}
