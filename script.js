document.addEventListener('DOMContentLoaded', () => {

    const themeToggle = document.getElementById('themeToggle');
    const htmlTag = document.documentElement;
    const hamburgerColor = document.querySelector('.hamburger-color');

    // Load theme preference from localStorage
    const savedTheme = JSON.parse(localStorage.getItem('theme'));







if (savedTheme) {
    htmlTag.setAttribute('data-theme', savedTheme.theme);
    themeToggle.style.transform = `rotate(${savedTheme.style})`;
    hamburgerColor.style.fill = savedTheme.lightDark;
    document.querySelectorAll('.dropdown-select').forEach(e => {
        e.setAttribute('data-theme', savedTheme.theme);
    })
    document.querySelector('.desktopNav ul li details summary').style.color = savedTheme.lightDark
    document.querySelectorAll('.desktopNav ul li a').forEach(e => {
        e.style.color = savedTheme.lightDark;
    })
}

themeToggle.addEventListener('click', () => {
    // Toggle theme
    if (htmlTag.getAttribute('data-theme') === 'dark') {
        htmlTag.setAttribute('data-theme', 'light');
        themeToggle.style.transform = 'rotate(180deg)'
        document.querySelector('.desktopNav ul li details summary').style.color = 'black'
        document.querySelectorAll('.desktopNav ul li a').forEach(e => {
            e.style.color = 'black';
        })
        hamburgerColor.style.fill = 'black'
        lightDark = 'black'
        chart.updateOptions({
            yaxis: {
                labels: {
                    style: {
                        colors: 'black'
                    }
                }
            },
            xaxis: {
                labels: {
                    style: {
                        colors: ['black', 'black'] // Change the colors here
                    }
                }
            },
            grid: {
                borderColor: 'black', // Change this color to your desired color
            },
        });
    } else {
        themeToggle.style.transform = 'rotate(360deg)'
        htmlTag.setAttribute('data-theme', 'dark');
        document.querySelector('.desktopNav ul li details summary').style.color = 'white'
        document.querySelectorAll('.desktopNav ul li a').forEach(e => {
            e.style.color = 'white';
        })
        hamburgerColor.style.fill = 'white'
        lightDark = 'white'
        chart.updateOptions({
            yaxis: {
                labels: {
                    style: {
                        colors: 'white'
                    }
                }
            },
            xaxis: {
                labels: {
                    style: {
                        colors: ['white', 'white'] // Change the colors here
                    }
                }
            },
            grid: {
                borderColor: 'white', // Change this color to your desired color
            },
        });
    }


    // Parse the transformValue to extract the rotation angle
    // const match = transformValue.match(/rotate\(([^)]+)\)/);
    const match = themeToggle.getAttribute('style').match(/rotate\(([^)]+)\)/);

    const data = {
        theme: htmlTag.getAttribute('data-theme'),
        style: match[1],
        lightDark: lightDark
    }

    // Save theme preference to localStorage
    localStorage.setItem('theme', JSON.stringify(data));
});


//Charts
    let lightDark;

    // Get the computed style of an element
    const rootStyle = getComputedStyle(document.documentElement);

    // // Get the value of --primary custom property
    const primaryColor = rootStyle.getPropertyValue('--primary');
    // console.log(primaryColor)

    // Static data for PPP values
    const countries = ['Country A', 'Country B'];
    const pppValues = [0, 0]; // Replace with your actual PPP values

    
    const barColors = ['#3CB285', '#3CB285'];
    let ModeColor;
    
    if (savedTheme) {
        ModeColor = savedTheme.lightDark;
    }else{
        ModeColor = 'black';
    }
    
    // Create a basic column chart
    var options = {
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
            }
        },
        xaxis: {
            categories: countries,
            labels: {
                style: {
                    colors: [ModeColor, ModeColor] // Change the colors here
                }
            }
        },
        grid: {
            borderColor: ModeColor, // Change this coltype="submit"or to your desired color
            strokeDashArray: 2
        },
        yaxis: {
            labels: {
                style: {
                    colors: [ModeColor] // Change the color of y-axis labels here
                }
            }
        },
        series: [{
            name: 'PPP Value',
            data: pppValues,
        }],
        colors: barColors, // Apply custom colors
    }

// pppChart(options)
// function pppChart(options){
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
// }



//Charts

})


function hamburgerBtn(that){
if(that.getAttribute('data-open')){
    document.querySelector('main .primaryColorbg').style.left = '100%'
    document.querySelector('main .primaryColorbg').addEventListener('transitionend', () => {
        that.removeAttribute('data-open');
        document.querySelector('main.calculator .container').style.filter = 'blur(0px)'
        document.body.style.overflow = "auto";
        that.style.transform = 'rotateY(0deg)'
        document.querySelector('main .primaryColorbg').classList.add('d-none')
    }, { once: true });
}else{
    that.setAttribute('data-open', 'true');
    document.querySelector('main .primaryColorbg').classList.remove('d-none')
    setTimeout(() => {
        document.querySelector('main .primaryColorbg').style.left = '30%'
        that.style.transform = 'rotateY(180deg)'
        document.body.style.overflow = "hidden";
        document.querySelector('main.calculator .container').style.filter = 'blur(20px)'
    }, 50)
}
}


function create_custom_dropdowns() {
$('select').each(function (i, select) {
// document.querySelectorAll('select').forEach((select, i) =>  {

    if (!$(this).next().hasClass('dropdown-select')) {
    // if (!this.nextElementSibling.classList.contains('dropdown-select')){

        $(this).after('<div class="dropdown-select wide ' + ($(this).attr('class') || '') + '" tabindex="0"><span class="current"></span><div class="list"><ul></ul></div></div>');
        var dropdown = $(this).next();
        var options = $(select).find('option');
        var selected = $(this).find('option:selected');
        dropdown.find('.current').html(selected.data('display-text') || selected.text());
        options.each(function (j, o) {
            var display = $(o).data('display-text') || '';
            dropdown.find('ul').append('<li class="option ' + ($(o).is(':selected') ? 'selected' : '') + '" data-value="' + $(o).val() + '" data-display-text="' + display + '">' + $(o).text() + '</li>');
        });
    }
    
});

$('.dropdown-select ul').before('<div class="dd-search"><input id="txtSearchValue" autocomplete="off" onkeyup="filter(this)" class="dd-searchbox" type="text"></div>');
}

// Event listeners

// Open/close
$(document).on('click', '.dropdown-select', function (event) {
if($(event.target).hasClass('dd-searchbox')){
    return;
}
$('.dropdown-select').not($(this)).removeClass('open');
$(this).toggleClass('open');
if ($(this).hasClass('open')) {
    $(this).find('.option').attr('tabindex', 0);
    $(this).find('.selected').focus();
} else {
    $(this).find('.option').removeAttr('tabindex');
    $(this).focus();
}
});

// Close when clicking outside
$(document).on('click', function (event) {
if ($(event.target).closest('.dropdown-select').length === 0) {
    $('.dd-searchbox').each(function(){
        $(this).val('');
    })
    $('.dropdown-select').removeClass('open');
    $('.dropdown-select .option').removeAttr('tabindex');
}
event.stopPropagation();
});

function filter(that){
var valThis = that.value;
// console.log(that)
$('.dropdown-select ul > li').each(function(){
 var text = $(this).text();
    (text.toLowerCase().indexOf(valThis.toLowerCase()) > -1) ? $(this).show() : $(this).hide();         
});
};
// Search

// Option click
$(document).on('click', '.dropdown-select .option', function (event) {
$(this).closest('.list').find('.selected').removeClass('selected');
// this.parentElement.parentElement.querySelector('.dd-searchbox').value = ''

$(this).addClass('selected');
var text = $(this).data('display-text') || $(this).text();
$(this).closest('.dropdown-select').find('.current').text(text);
$(this).closest('.dropdown-select').prev('select').val($(this).data('value')).trigger('change');
});

// Keyboard events
$(document).on('keydown', '.dropdown-select', function (event) {
var focused_option = $($(this).find('.list .option:focus')[0] || $(this).find('.list .option.selected')[0]);
// Space or Enter
//if (event.keyCode == 32 || event.keyCode == 13) {
if (event.keyCode == 13) {
    if ($(this).hasClass('open')) {
        focused_option.trigger('click');
    } else {
        $(this).trigger('click');
    }
    return false;
    // Down
} else if (event.keyCode == 40) {
    if (!$(this).hasClass('open')) {
        $(this).trigger('click');
    } else {
        focused_option.next().focus();
    }
    return false;
    // Up
} else if (event.keyCode == 38) {
    if (!$(this).hasClass('open')) {
        $(this).trigger('click');
    } else {
        var focused_option = $($(this).find('.list .option:focus')[0] || $(this).find('.list .option.selected')[0]);
        focused_option.prev().focus();
    }
    return false;
    // Esc
} else if (event.keyCode == 27) {
    if ($(this).hasClass('open')) {
        $(this).trigger('click');
    }
    return false;
}
});

document.addEventListener('DOMContentLoaded', () => {
create_custom_dropdowns();
});