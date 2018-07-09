/**
* Copyright (c) 2013 Laoshancun  律师365 
* 
*
* Version: 1.0.0
*
* 
*/




( function( $ ) {
    $.fn.HlSwitcher = function( options ) {
        var opts = $.extend( {}, $.fn.HlSwitcher.Defaults, options );
        return this.each( function() {

            var $this = $( this ),
        	    ready = $.data( $this[0], 'isready' ),
        	    current = 0,
        	    timer = null,
        	    $contents = $( opts.lst_contents, $this ),
        	    $focus = $( opts.ctn_focus, $this ),
                len = $contents.length,
                isAutoShow = [],

                w = opts.direction == 'left' ? $contents.width() : $contents.height(),

                width = w * len;

            if ( ready != 'true' ) {

                $( 'img:eq(0)', $contents ).load( function() {
                    w = opts.direction == 'left' ? ( $contents.width() || this.width ) : ( $contents.height() || this.height );
                    $contents.css( opts.direction == 'left' ? 'width' : 'height', w );
                    $( 'div.swh_wraper', $this ).css( opts.direction == 'left' ? 'width' : 'height', w );
                    $( 'div.swh_content', $this ).css( opts.direction == 'left' ? 'width' : 'height', w * len );
                } );

                ready = $.data( $this[0], 'isready', 'true' );
                if ( $( opts.wap_contents, $this ).length < 1 ) {
                    $contents.wrapAll( "<div class=\"swh_wraper\" style=\"" + ( opts.direction == 'left' ? 'width' : 'height' ) + ":" + w + "px;overflow:hidden;position:relative;\"><div class=\"swh_content\" style=\"" + ( opts.direction == 'left' ? 'width' : 'height' ) + ":" + width + "px;position:relative;\"></div></div>" );
                } else {
                    if ( $( opts.wap_contents, $this ).find( '.swh_content' ).length < 1 ) {

                    }
                }

                for ( var i = 0; i < len; i++ ) {
                    if ( !$contents.eq( i ).hasClass( opts.skipFlag ) ) {
                        isAutoShow.push( i );
                    }
                }
                $this.addClass( 'len' + isAutoShow.length );

                if ( opts.direction == 'left' ) {
                    $contents.css( { "float": "left", "display": "block" } );
                }

                function indexof( array, val ) {
                    /// 如果浏览器原生支持indexOf，则使用原生的方法
                    if ( Array.prototype.indexOf ) {
                        return array.indexOf( val );
                    }
                    /// 自定义方式实现indexOf
                    for ( var i = 0, len = array.length; i < len; i++ ) {
                        if ( array[i] === val ) {
                            return i;
                        }
                    }
                    return -1;
                }
                var switcher = function( index, isClick ) {
                    if ( index >= len ) current = index = 0;
                    if ( index < 0 ) current = index = len - 1;
                    if ( typeof isClick == "undefined" || isClick == false ) {

                        if ( isAutoShow.length <= 1 ) {

                            current = index = isAutoShow[0] || 0;
                            $focus.eq( index ).addClass( opts.cls_focus ).siblings().attr( 'class', '' );
                            if ( opts.direction == "left" ) {
                                $this.find( ".swh_content" ).css( { "left": -w * index } );
                            } else {
                                $this.find( ".swh_content" ).css( { "top": -w * index } );
                            }
                            return false;
                        }

                        while ( $.inArray( index, isAutoShow ) == -1 ) {
                            index = ( index + 1 ) % len;
                        }

                        current = index;
                        if ( indexof( isAutoShow, index ) < 0 ) {

                            return switcher( ++index );
                        }
                    }
                    // window.clearTimeout(timer);
                    $focus.eq( index ).addClass( opts.cls_focus ).siblings().removeClass( opts.cls_focus );
                    if ( opts.direction == "left" ) {
                        $this.trigger( 'switch', index );
                        $this.find( ".swh_content" ).stop().animate( { "left": -w * index }, opts.animationSpeed, opts.animationType, function() {
                            $this.trigger( 'switched', index );
                        } );
                    } else {
                        $this.trigger( 'switch', index );
                        $this.find( ".swh_content" ).stop().animate( { "top": -w * index }, opts.animationSpeed, opts.animationType, function() {
                            $this.trigger( 'switched', index );

                        } );
                    }
                    // timer = window.setTimeout(function () {
                    //     switcher(++index);
                    // }, opts.timeOut);
                };

                if ( opts.autoStart ) {
                    switcher( current );
                    timer = window.setInterval( function() {
                        switcher( ++current );
                    }, opts.timeOut );
                    $this.hover( function() {
                        clearInterval( timer );
                    }, function() {
                        timer = window.setInterval( function() {
                            switcher( ++current );
                        }, opts.timeOut );
                    } );
                }
                $this.find( opts.btn_pre ).click( function() {
                    switcher( --current, true );
                } );
                $this.find( opts.btn_next ).click( function() {
                    switcher( ++current, true );
                } );
                $focus.each( function( index, obj ) {
                    $( obj ).bind( 'click', function() {
                        current = index;
                        switcher( index, true );
                    } );
                } );

            }
        } );
    };
    $.fn.HlSwitcher.Defaults = {
        btn_pre: ".rd_lh > .qh_q",		// 箭头left
        btn_next: ".rd_lh > .qh_h",		// 箭头right
        ctn_focus: ".rd_lh span",		// 默认点
        cls_focus: "qh_xz",				// 当前点
        wap_contents: ".swh_wraper",	// ？
        lst_contents: ".qh_list",		// li
        autoStart: true,				//
        animationSpeed: 800,			//
        animationType: "linear",		//
        timeOut: 5000,					//
        skipFlag: "skip",				//
        direction: 'left'				//
    };
} )( jQuery );