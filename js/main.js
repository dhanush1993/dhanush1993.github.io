$('document').ready(function() {
    var isMobile = false; //initiate as false
    // device detection
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;
    
    if(isMobile){
        alert("The webpage is not mobile compatible. Please open in desktop/laptop browser.");
    }
    else{
        
        scrolled = 1;

    alertTip = 0;
    defaultContainer = "logoContainer";
    killme = setTimeout(function() {
        $('#alerttip .modal-title').text('Help!');
        $('#alerttip .modal-body').html('Click <h4>Right Arrow</h4> or <h4>Scroll Down Slowly</h4> to navigate...</h4>');
        try {
            $('#alerttip').modal('show');
            alertTip = 1;
        } catch (me) {}
    }, 15000)

    setup();
    //$('#bio').css('left',window.innerWidth+10+'px');
    $(document).keydown(function(e) {
        
        e.preventDefault();
        if (e.keyCode == 37) { // left
            changeFrame(-120);
        } else if (e.keyCode == 39) { // right
            changeFrame(120);
        }
    });
    window.addEventListener("resize", function(e) {
        e.preventDefault();

        setup();
    });
    document.addEventListener("wheel", function(e) {
        e.preventDefault();
        if (Math.abs(e.deltaY) > 25) {
            var variation = parseInt(e.deltaY);
            changeFrame(variation);
        }

    }, true);
    starfield();
    textEffect();
}
});
var scrolled;
var killme, alertTip;


var content = [{
        'title': 'Fault Tolerant Sensor Using Model Based Simulated Value For Space Science Environment Simulation Applications.',
        'content': 'Integrated spacecrafts and associated appendages have to be tested for performance in simulated space environments before launch. These tests involve simulation of thermal and vacuum environments for the space which are performed in thermo-vacuum chambers as well as thermal cycling tests for appendages. Temperature variations in these tests are performed by radiatively coupling the test object with an active surface heated and cooled by the media flowing within. Usually thermocouples placed on the test object act as the process value to which the control system responds by manipulating the temperature of the media in the active surface. Unlike other process applications where a fault in the control channel value can be tolerated or rectified, sensors in thermo-vacuum chambers are inaccessible. The failure of this thermocouple leads to loss of control or wrong control action. This paper introduces the application of model identification techniques to simulate the test object thermocouple data. The same simulated value is used as the process value for the control system. The developed application identifies linear models viz. ARX and ArMaX and non-linear models viz. NLARX and Neural. The simulated process value for the control system is automatically selected in case of constraint violation by the actual sensor value. Process dynamics can be observed and either PID or Fuzzy control can be applied. Both model based process value simulation and control gave excellent results.'
    },
    {
        'title': 'Detection of Valve Regurgitation Using Mel Frequency Cepstral Coefficients and Deep Learning.',
        'content': 'The human heart pumps blood throughout the body, beating approximately 72 times per minute and consuming 1-5W of power. The flow of blood in the heart is controlled by flaps called valves that open to let blood flow in one direction as it moves through the chambers of the heart and close to prevent blood flowing backwards into the chamber it just left. Any of the four valves can go leaky allowing blood that was squeezed forward to flow backward through the valve. Leakage of blood through the valves is also called Valve Regurgitation. With a leaky valve, the heart consumes more energy to pump the same amount of blood. A leaky valve if left unnoticed may cause health issues that could either be minor or serious. Common approach for detection of a leaky valve is observation over time for changes or ultrasound scan. But these approaches are either time consuming or expensive. This paper defines a model to extract features from a phonocardiogram and classify heart beats for anomaly detection with the model implemented on a FPGA and its performance compared. '
    },


];

function conatinerChange(container){
    switch(container){
        case 'logoContainer': $('#modelContainer').hide();
        $('#webContainer').hide();
        $('#logoContainer').show();
        $('#logoC').attr('class','nav-item active');
        $('#modelC').attr('class','nav-item');
        $('#webC').attr('class','nav-item');
        break;

        case 'modelContainer':$('#webContainer').hide();
        $('#logoContainer').hide();
        $('#modelContainer').show();
        $('#modelC').attr('class','nav-item active');
        $('#logoC').attr('class','nav-item');
        $('#webC').attr('class','nav-item');
        break;

        case 'webContainer': $('#modelContainer').hide();
        $('#logoContainer').hide();
        $('#webContainer').show();
        $('#webC').attr('class','nav-item active');
        $('#modelC').attr('class','nav-item');
        $('#logoC').attr('class','nav-item');
        break;
    }
}

function finished(t) {
    setTimeout(function() {
        scrolled = 1;
    }, t)
}

function setup() {
    if (frame != 1)
        $('#projects').css('top', window.innerHeight + 10 + 'px');
    if (frame != 2)
        $('#designs').css('left', window.innerWidth + 10 + 'px');
    if (frame != 3)
        $('#games').css('top', (-1 * window.innerHeight - 10) + 'px');
    if (frame != 4)
        $('#experience').css('left', -1 * window.innerWidth - 10 + 'px');
    if (frame != 5)
        $('#education').css('top', window.innerHeight + 10 + 'px');
}

function showModal(what) {
    $('.modal-title').text(content[what].title);
    $('.modal-body').text(content[what].content);
    try {
        $('#myModal').modal('toggle');
    } catch (me) {
        $('#myModal').modal();
    }
}

function showImg(img) {
    $('.modal-title').text('Design');
    $('.modal-body').html("<div style='display:flex; justify-items: center; align-items: center;'><img src='" + img + " 'style='height: 60%; margin:0 auto;'></div>");
    try {
        $('#myModal').modal('toggle');
    } catch (me) {
        $('#myModal').modal();
    }
}

function showVideo(src){
    $('.modal-title').text('Video');
    $('.modal-body').html("<div style='display:flex; justify-items: center; align-items: center;'><iframe src="+src+" width='1240' height='720' style='margin:0 auto;'></iframe></div>");
    try {
        $('#myModal').modal('toggle');
    } catch (me) {
        $('#myModal').modal();
    }
}

var frame = 0;
var maxFrames = 6;

function changeFrame(direction) {

    if(scrolled){
        scrolled = 0;
        try {
            if (alertTip) {
                $('#alerttip').modal('hide');
                alertTip = 0;
            }
            clearInterval(killme);
        } catch (me) {}
        if (direction > 0) {
            frame = frame + 1
            if (frame > maxFrames) {
                frame = maxFrames;
            }
        } else {
            frame = frame - 1;
            if (frame < 0) {
                frame = 0;
            }

        }

        if (frame > 0) {
            $('#scrollUp').show();
        } else {
            $('#scrollUp').hide();
        }

        if (frame < maxFrames) {
            $('#scrollDown').show();
        } else {
            $('#scrollDown').hide();
        }
        switch (frame) {
            case 0:
                $('#projects').animate({
                    'top': window.innerHeight + 10 + 'px'
                });
                finished(500);
                break;
            case 1:
                $('#projects').animate({
                    'top': "0px"
                }, 500);
                finished(2500);
                $('#projects #title').animate({
                    'opacity': "1",
                    "width": "40%"
                }, 1500);
                $('#projects span').show(1500);
                $('#designs #title').animate({
                    'opacity': '0',
                    'height': "100%"
                }, 1000);
                setTimeout(function() {
                    $('#designs').animate({
                        'left': window.innerWidth + 10 + 'px'
                    });
                }, 1000);
                break;
            case 2:
                $('#projects span').hide();
                $('#projects #title').animate({
                    'opacity': "0",
                    "width": "100%"
                }, 1000);
                setTimeout(function() {

                    $('#designs').animate({
                        'left': "0px"
                    });

                }, 1000);
                setTimeout(function() {
                    $('#projects').animate({
                        'top': window.innerHeight + 10 + 'px'
                    });
                    $('#designs #title').animate({
                        'opacity': '1',
                        'height': "120px"
                    }, 1000);
                }, 1500);
                setTimeout(function() {
                    $('#games').animate({
                        'top': (-1 * window.innerHeight - 10) + 'px'
                    });
                }, 1500);
                finished(3000);
                break;
            case 3:
                setTimeout(function() {
                    $('#designs').animate({
                        'left': window.innerWidth + 10 + 'px'
                    });
                    $('#designs #title').animate({
                        'opacity': '0'
                    }, 1000);
                }, 1000);
                $('#designs #title').animate({
                    'height': "100%"
                }, 1000);
                setTimeout(function() {
                    $('#games').animate({
                        'opacity': '1',
                        'top': "0px"
                    }, 100);
                }, 900);
                $('#experience #content #con').animate({
                    'opacity': '0'
                }, 10);
                $('#experience #content').animate({
                    'width': '0%'
                }, 1000);
                $('#experience span').animate({
                    'opacity': '0'
                }, 10);
                setTimeout(function() {
                    $('#experience').animate({
                        'left': -1 * window.innerWidth - 10 + 'px'
                    });
                }, 1000);
                finished(3000);
                break;
            case 4:
                $('#games').animate({
                    'opacity': '0'
                }, 500);
                $('#games').animate({
                    'top': (-1 * window.innerHeight - 10) + 'px'
                });
                $('#experience').animate({
                    'opacity': '1',
                    'left': "0px"
                }, 50);
                setTimeout(function() {
                    $('#experience #content #con').animate({
                        'opacity': '1'
                    }, 200);
                }, 1200);
                setTimeout(function() {
                    $('#experience #content').animate({
                        'width': '60%'
                    }, 1000);

                    $('#experience span').animate({
                        'opacity': '1'
                    }, 1000);
                }, 100);
                $('#education #content').animate({
                    'height': "0px",
                    'opacity': "0"
                }, 500);
                setTimeout(function() {
                    $('#education').animate({
                        'top': window.innerHeight + 10 + 'px'
                    });
                    $('#education').animate({
                        'opacity': "0",
                    }, 500);
                }, 600);
                finished(2000);
                break;
            case 5:
                $('#experience #content #con').animate({
                    'opacity': '0'
                }, 10);
                $('#experience span').animate({
                    'opacity': '0'
                }, 10);
                $('#experience #content').animate({
                    'width': '0%'
                }, 1000);
                setTimeout(function() {
                    $('#experience').animate({
                        'left': -1 * window.innerWidth - 10 + 'px'
                    }, 1000);
                }, 1200);
                setTimeout(function() {

                    $('#education').animate({
                        'top': "0px"
                    }, 200);
                    $('#education').animate({
                        'opacity': "1",
                    }, 10);
                    $('#education #content').animate({
                        'opacity': "1",
                    }, 10);
                }, 1000);
                setTimeout(function() {
                    $('#education #content').animate({
                        'height': "80%",
                    }, 500);

                }, 1200);
                setTimeout(function() {
                    $('#bio').animate({
                        'opacity': '0'
                    }, 500);
                    $('#bio').hide(1000);
                }, 1200);
                finished(3000);
                break;

            case 6:
                $('#education').animate({
                    'opacity': '0'
                }, 1000);
                $('#education content').animate({
                    'opacity': "0",
                }, 10);
                $('#bio').show();
                $('#bio').animate({
                    'opacity': '1'
                }, 500);
                finished(1500);
                break;
        }
    }
}



var textEffect = function() {
    var xoffset = 2,
        y0ffset = 0,
        mouseX = 0,
        mouseY = 0,
        oldX = 0;
    oldY = 0, xDirection = 'right', yDirection = 'up';

    var HEIGHT = window.innerHeight;
    var WIDTH = window.innerWidth;
    var textScale = 2/(window.innerWidth/screen.width);
    var windowHalfX = WIDTH / 2;
    var windowHalfY = HEIGHT / 2;
    var forceRadius = 0.5;
    document.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize(e) {
        e.preventDefault();
        nWIDTH = window.innerWidth;
        nHEIGHT = window.innerHeight;
        var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;
    camera.aspect = nWIDTH/nHEIGHT;
    camera.updateProjectionMatrix();
    //renderer.setSize(WIDTH, HEIGHT);
        renderer.setSize(nWIDTH, nHEIGHT);
        if(nWIDTH < 800)
        {
            if (nWIDTH < screen.width / 1.8) {
                tmp1 = (0.5) * 5 / 2;
            } else {
                tmp1 = Math.abs(((nWIDTH-WIDTH) / screen.width));
            }

            for (i = 0; i < groups.children[0].children.length; i++) {
                groups.children[0].children[i].home.position.x = (groups.children[0].children[i].home.position.ax) / (tmp1);
                groups.children[0].children[i].home.position.y = (groups.children[0].children[i].home.position.ay) / (tmp1);
            }
            WIDTH = nWIDTH;
            HEIGHT = nHEIGHT;
            windowHalfX = WIDTH / 2;
            windowHalfY = HEIGHT / 2;
        }

    }

    function onMouseMove(e) {
        e.preventDefault();
        mouseX = (((((e.clientX - windowHalfX) / windowHalfX)) * 4.5));
        mouseY = ((((windowHalfY - e.clientY) / windowHalfY) * 2.5));
        sp.position.set(mouseX, mouseY, 0);
        getMouseDirection(e.clientX, e.clientY);
    }
    var vertices = [
        [
            [-5, 2],
            [-5.5, 1],
            [-4, 1.5]
        ],
        [
            [-3.8, 2.2],
            [-3.6, 1.1],
            [-3.3, 1.7],
            [-3, 0]
        ],
        [
            [-2.3, 1.5],
            [-2.7, 1],
            [-2, 1],
            [-1.8, 1.1]
        ],
        [
            [-1.5, 1.6],
            [-1.6, 1.1],
            [-1, 1.4],
            [-1, 1]
        ],
        [
            [-0.7, 1.3],
            [-0.6, 0.8],
            [0.1, 1],
            [0.2, 1.4]
        ],
        [
            [1.3, 2],
            [0.5, 1.5],
            [0.8, 1],
            [-1, -2]
        ],
        [
            [1.8, 2.2],
            [1.4, 1.1],
            [1.8, 1.7],
            [2, 1.1]
        ]
    ];
    var connections = [
        [
            [0, 1, 1],
            [0, 0, 1]
        ],
        [
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ],
        [
            [0, 1, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ],
        [
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ],
        [
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ],
        [
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ],
        [
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ]
    ];
    var container = document.createElement('div');
    $(container).css({
        'position': 'absolute',
        'top': '0px',
        'left': '0px',
        'z-index': '1'
    });
    $('body').append(container);
    $('body').css('overflow', 'hidden');
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer({
        alpha: true
    });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor(0x000000, 0);
    container.append(renderer.domElement);
    var groups = new THREE.Group();
    var lineGroups = new THREE.Group();
    var planes = new THREE.Group();
    var lines = new THREE.Group();
    var lineMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.4,
        linewidth: 0.01,
        fog: true
    });
    var material = new THREE.MeshBasicMaterial({
        color: 0xffffff
    });
    var glow1 = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.5
    });
    var glow2 = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.2
    });
    var transparentMat = new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0
    });
    var forceGeometry = new THREE.CircleGeometry(forceRadius, 32);

    var sp = new THREE.Mesh(forceGeometry, transparentMat);
    sp.position.set((1 * 2.5 * WIDTH / HEIGHT) - 0.5, (1 * 2.5) - 0.5, 0);
    scene.add(sp);

    function init() {
        for (i = 0; i < vertices.length; i++) {
            vertex = vertices[i];
            connection = connections[i];
            for (j = 0; j < vertex.length; j++) {
                var geometry = new THREE.SphereGeometry(0.01, 32, 32);
                var glowGeometry1 = new THREE.SphereGeometry(0.015, 32, 32);
                var glowGeometry2 = new THREE.SphereGeometry(0.025, 32, 32);
                var plane = new THREE.Mesh(geometry, material);
                var glowPlane1 = new THREE.Mesh(glowGeometry1, glow1);
                var glowPlane2 = new THREE.Mesh(glowGeometry2, glow2);
                plane.position.x = (xoffset + vertex[j][0]) / textScale;
                glowPlane1.position.set(0, 0, 0);
                glowPlane2.position.set(0, 0, 0);
                plane.position.y = (vertex[j][1]) / textScale;
                plane.home = {};
                plane.home.position = {};
                plane.home.position.x = (xoffset + vertex[j][0]) / textScale;
                plane.home.position.y = (vertex[j][1]) / textScale;
                plane.home.position.ax = (xoffset + vertex[j][0]) / textScale;
                plane.home.position.ay = (vertex[j][1]) / textScale;
                plane.arrNumber = (i * (vertex.length)) + j;
                plane.add(glowPlane1);
                plane.add(glowPlane2);
                planes.add(plane);
                if (vertex.length - 1 > j) {
                    con = connection[j];
                    for (k = 0; k < con.length; k++) {
                        if (con[k] == 1) {

                            var lineGeometry = new THREE.Geometry();
                            lineGeometry.vertices.push(
                                new THREE.Vector3(xoffset + vertex[j][0], vertex[j][1], 0),
                                new THREE.Vector3(xoffset + vertex[k][0], vertex[k][1], 0)
                            );

                            var line = new THREE.Line(lineGeometry, lineMaterial);
                            line.geometry.verticesNeedUpdate = true;
                            line.from = (i * (vertex.length)) + j;
                            line.to = (i * (vertex.length)) + k;
                            lines.add(line);
                        }
                    }
                }
            }

            lineGroups.add(lines);
            groups.add(planes);
        }
    }
    scene.add(groups);
    scene.add(lineGroups);
    camera.position.z = 5;

    function getMouseDirection(x, y) {
        //deal with the horizontal case
        if (oldX < x) {
            xDirection = "right";
        } else {
            xDirection = "left";
        }

        //deal with the vertical case
        if (oldY < y) {
            yDirection = "down";
        } else {
            yDirection = "up";
        }

        oldX = x;
        oldY = y;
    }

    function redrawLines() {
        //scene.remove(lineGroups);
        index = 0;
        //lineGroups = new THREE.Group();
        //lines = new THREE.Group();
        var temp = 0;
        for (j = 0; j < lineGroups.children[0].children.length; j++) {
            con = lineGroups.children[0].children[j];
            //for(k=0;k<con.length;k++){
            //var lineGeometry = new THREE.Geometry();
            var positions = con.geometry.vertices;
            var x1 = 0,
                y1 = 0,
                x2 = 0,
                y2 = 0;
            for (l = 0; l < groups.children[0].children.length; l++) {
                if (groups.children[0].children[l].arrNumber == con.from) {
                    x1 = groups.children[0].children[l].position.x, y1 = groups.children[0].children[l].position.y;
                }
                if (groups.children[0].children[l].arrNumber == con.to) {
                    x2 = groups.children[0].children[l].position.x, y2 = groups.children[0].children[l].position.y;
                    break;
                }
            }

            positions[0].x = x1;
            positions[0].y = y1;
            positions[1].x = x2;
            positions[1].y = y2;
            con.geometry.verticesNeedUpdate = true;

            // var line = new THREE.Line( lineGeometry, lineMaterial );
            // lines.add( line );
            //}
        }
        index = index + 1;
        //}
        temp += connection.length + 1;
        lineGroups.add(lines);
        index = index + 1;
    }

    function update() {
        for (i = 0; i < groups.children.length; i++) {
            for (j = 0; j < groups.children[i].children.length; j++) {
                if (groups.children[i].children[j].type == 'Mesh') {
                    var dx = groups.children[i].children[j].position.x - sp.position.x;
                    var dy = groups.children[i].children[j].position.y - sp.position.y;
                    var distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 0.01 + forceRadius) {
                        try {
                            if (xDirection == "right") {
                                groups.children[i].children[j].position.x += (0.01 + forceRadius - distance) * 0.1;
                            } else {
                                groups.children[i].children[j].position.x -= (0.01 + forceRadius - distance) * 0.1;
                            }

                            if (yDirection == "up") {
                                groups.children[i].children[j].position.y += (0.01 + forceRadius - distance) * 0.1;
                            } else {
                                groups.children[i].children[j].position.y -= (0.01 + forceRadius - distance) * 0.1;
                            }
                        } catch (me) {

                        }
                    } else {
                        if (groups.children[i].children[j].position.x > groups.children[i].children[j].home.position.x) {
                            groups.children[i].children[j].position.x -= (groups.children[i].children[j].position.x - groups.children[i].children[j].home.position.x) * 0.01;
                        } else if (groups.children[i].children[j].position.x < groups.children[i].children[j].home.position.x) {
                            groups.children[i].children[j].position.x += (-groups.children[i].children[j].position.x + groups.children[i].children[j].home.position.x) * 0.01;
                        }
                        if (Math.abs(groups.children[i].children[j].position.x - groups.children[i].children[j].home.position.x) < 0.005) {
                            groups.children[i].children[j].position.x = groups.children[i].children[j].home.position.x;
                        }

                        if (groups.children[i].children[j].position.y > groups.children[i].children[j].home.position.y) {
                            groups.children[i].children[j].position.y -= (groups.children[i].children[j].position.y - groups.children[i].children[j].home.position.y) * 0.01;
                        } else if (groups.children[i].children[j].position.y < groups.children[i].children[j].home.position.y) {
                            groups.children[i].children[j].position.y += (groups.children[i].children[j].position.y < groups.children[i].children[j].home.position.y) * 0.01;
                        }
                        if (Math.abs(groups.children[i].children[j].position.y - groups.children[i].children[j].home.position.y) < 0.005) {
                            groups.children[i].children[j].position.y = groups.children[i].children[j].home.position.y;
                        }
                    }
                }
            }
        }
    }

    function animate() {
        update();
        redrawLines();
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    init();
    animate();

};



var starfield = function() {
    'use strict';
    /* 	'To actually be able to display anything with Three.js, we need three things:
        A scene, a camera, and a renderer so we can render the scene with the camera.' 
               
               - https://threejs.org/docs/#Manual/Introduction/Creating_a_scene 		*/

    var scene, camera, renderer;

    /* We need this stuff too */
    var container, aspectRatio,
        HEIGHT, WIDTH, fieldOfView,
        nearPlane, farPlane,
        mouseX, mouseY, windowHalfX,
        windowHalfY, stats, geometry,
        starStuff, materialOptions, stars;

    init();
    animate();

    function init() {
        container = document.createElement('div');
        $(container).css({
            'position': 'absolute',
            'top': '0px',
            'left': '0px',
            'z-index': '0'
        })
        $('body').append(container);
        $('body').css('overflow', 'hidden');

        HEIGHT = window.innerHeight;
        WIDTH = window.innerWidth;
        aspectRatio = WIDTH / HEIGHT;
        fieldOfView = 75;
        nearPlane = 1;
        farPlane = 1000;
        mouseX = 0;
        mouseY = 0;

        windowHalfX = WIDTH / 2;
        windowHalfY = HEIGHT / 2;

        /* 	fieldOfView — Camera frustum vertical field of view.
                aspectRatio — Camera frustum aspect ratio.
                nearPlane — Camera frustum near plane.
                farPlane — Camera frustum far plane.	

                - https://threejs.org/docs/#Reference/Cameras/PerspectiveCamera

                 In geometry, a frustum (plural: frusta or frustums) 
                 is the portion of a solid (normally a cone or pyramid) 
                 that lies between two parallel planes cutting it. - wikipedia.		*/

        camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);

        //Z positioning of camera

        camera.position.z = farPlane / 2;

        scene = new THREE.Scene({
            antialias: true
        });
        scene.fog = new THREE.FogExp2(0x000000, 0.0003);

        // The wizard's about to get busy.
        starForge();

        //check for browser Support
        if (webGLSupport()) {
            //yeah?  Right on...
            renderer = new THREE.WebGLRenderer({
                alpha: true
            });

        } else {
            //No?  Well that's okay.
            renderer = new THREE.CanvasRenderer();
        }

        renderer.setClearColor(0x000011, 1);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(WIDTH, HEIGHT);
        container.appendChild(renderer.domElement);

        // stats = new Stats();
        // stats.domElement.style.position = 'absolute';
        // stats.domElement.style.top = '0px';
        // stats.domElement.style.right = '0px';
        // container.appendChild( stats.domElement );

        window.addEventListener('resize', onWindowResize, false);
        document.addEventListener('mousemove', onMouseMove, false);

    }

    function animate() {
        requestAnimationFrame(animate);
        render();
        //stats.update();
    }


    function render() {
        camera.position.x += (mouseX - camera.position.x) * 0.005;
        camera.position.y += (-mouseY - camera.position.y) * 0.005;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
    }

    function webGLSupport() {
        /* 	The wizard of webGL only bestows his gifts of power
            to the worthy.  In this case, users with browsers who 'get it'.		*/

        try {
            var canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && (
                canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        } catch (e) {
            // console.warn('Hey bro, for some reason we\'re not able to use webGL for this.  No biggie, we\'ll use canvas.');
            return false;
        }
    }

    function onWindowResize() {

        // Everything should resize nicely if it needs to!
        var WIDTH = window.innerWidth,
            HEIGHT = window.innerHeight;

        camera.aspect = aspectRatio;
        camera.updateProjectionMatrix();
        renderer.setSize(WIDTH, HEIGHT);
    }

    function starForge() {
        /* 	Yep, it's a Star Wars: Knights of the Old Republic reference,
            are you really surprised at this point? 
                                                    */
        var starQty = 10000;
        geometry = new THREE.SphereGeometry(1000, 100, 50);

        materialOptions = {
            size: 0.5, //I know this is the default, it's for you.  Play with it if you want.
            transparency: true,
            opacity: 0.7
        };

        starStuff = new THREE.PointCloudMaterial(materialOptions);

        // The wizard gaze became stern, his jaw set, he creates the cosmos with a wave of his arms

        for (var i = 0; i < starQty; i++) {

            var starVertex = new THREE.Vector3();
            starVertex.x = Math.random() * 2000 - 1000;
            starVertex.y = Math.random() * 2000 - 1000;
            starVertex.z = Math.random() * 2000 - 1000;

            geometry.vertices.push(starVertex);

        }


        stars = new THREE.PointCloud(geometry, starStuff);
        scene.add(stars);
    }

    function onMouseMove(e) {

        mouseX = e.clientX - windowHalfX;
        mouseY = e.clientY - windowHalfY;
    }

};