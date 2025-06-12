/* model slide in and out - start */
function modelSlide(mode, content) {
    event.stopPropagation();
    document.querySelector("." + mode).style.visibility = "visible";
    document.querySelector("." + content).style.transform = "translateX(0)";
}

function modelSlideClose(mode, content) {
    document.querySelector("." + mode).removeAttribute('style');
    document.querySelector("." + content).removeAttribute('style');
}
/* model slide in and out - end */

/* changing theme - start */
document.querySelector(".themeChanging").addEventListener("click", function(){
    document.getElementsByTagName('BODY')[0].classList.toggle("darkTheme");
});
/* changing theme - end */

//document.querySelector(".avatarImgContainer").addEventListener("click", function () {
//    event.stopPropagation();
//    let avatar = document.querySelector(".avatarImgContainer .dropDown");
//    avatar.hasAttribute('style') ? avatar.removeAttribute('style') : avatar.style.display = "block";    
//});

//const myDropdown = document.querySelectorAll('.dropDown');
//for (let i = 0; i < myDropdown.length; i++) {
//    myDropdown[i].addEventListener("click", function () {
//        if (myDropdown[i].hasAttribute('style')) {
//            myDropdown[i].removeAttribute('style');
//        }
//    });
//}
/* dropDown - start */
const myDropDownBtn = document.querySelectorAll(".dropDownBtn");
for (let i = 0; i < myDropDownBtn.length; i++) {
    myDropDownBtn[i].addEventListener("click", function () {        
        let dropDown = event.target.nextElementSibling;        
        dropDown.hasAttribute('style') ? dropDown.removeAttribute('style') : dropDown.style.display = "block";
    });
}

window.onclick = function (event) {
    if (!event.target.matches('.dropDownBtn')) {
        let dropdowns = document.querySelectorAll(".dropDown");        
        for (let i = 0; i < dropdowns.length; i++) {            
            if (dropdowns[i].hasAttribute('style')) {
                dropdowns[i].removeAttribute('style');
            }
        }
    }
}
/* dropDown - end */
//function dropDownToggle() {    
//    let dropDown = event.target.nextElementSibling;
    
//    dropDown.hasAttribute('style') ? dropDown.removeAttribute('style') : dropDown.style.display = "block";    
//}


//function approvedLoanCard() {
//    const canvasApproLoans = document.getElementById("canvasApproLoans");
//    let ctx = canvasApproLoans.getContext("2d");
//    let graphPercent = 0.55;    
//    //if (randomApprovedLoanCount > 0) {
//    //    graphPercent = $scope.approLoanCount / $scope.leadCount;
//    //    $scope.approvedLoanPer = Math.round(($scope.approLoanCount / $scope.leadCount) * 100);
//    //}
//    //else {
//    //    graphPercent = 0;
//    //    $scope.approvedLoanPer = 0;
//    //}

//    ctx.beginPath();
//    ctx.lineWidth = 7;
//    ctx.strokeStyle = "rgba(245, 203, 67, 0.4)";
//    ctx.arc(30, 30, 25, 0, 2 * Math.PI);
//    ctx.stroke();
//    ctx.beginPath();
//    ctx.lineWidth = 7;
//    ctx.strokeStyle = "rgba(245, 203, 67, 1)";
//    ctx.arc(30, 30, 25, 1.75 * Math.PI, 2 * graphPercent * Math.PI);
//    ctx.stroke();

//}
//approvedLoanCard();
/* changind this day and this month dropdown option in cards - start */
function cardDropOption(className1, className2) {
    document.querySelector("." + className1).style.display = "block";
    document.querySelector("." + className2).style.display = "none";
}
/* changind this day and this month dropdown option in cards - end */

/* content tab - start */
function contentTab(evt, cityName) {
  let i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tabBtn");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();
/* content tab - end */

/* popover - start */
const popoverBtn = document.querySelectorAll(".myPopOverBtn");
for (let i = 0; i < popoverBtn.length; i++) {
    popoverBtn[i].addEventListener("click", function () {
        let popover = event.target.nextElementSibling;
        popover.hasAttribute('style') ? popover.removeAttribute('style') : popover.style.display = "flex";
    });
}
/* popover - end */

/* accodian - start */
let acc = document.getElementsByClassName("accordion");
//let windowHeight = window.innerHeight;
//document.querySelector('.abcd').style.maxHeight = (windowHeight * 0.90) - 56 + 'px';
for (let i = 0; i < acc.length; i++) {    
    acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        let panel = this.nextElementSibling;
        if (panel.style.maxHeight) {            
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";                      
        }       
    });
}
/* accodian - end */

/*automatically adding commas to number while typing - start */
function Comma(Num) {
    Num += '';
    Num = Num.replace(/,/g, '');
    x = Num.split('.'); x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d)((\d)(\d{2}?)+)$/;
    while (rgx.test(x1))
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    return x1 + x2;
}
/*automatically adding commas to number while typing - end */

/*=============================================================================================
                                    angularjs - start
==============================================================================================*/
var app = angular.module('myApp', []);
app.controller('employeePortal', function ($scope, $http, $window, $filter) {
    $scope.unassContactCount = 1000;
    $scope.assContactCount = 100;   
    $scope.leadCountMonth = 90;
    $scope.leadCountDay = 10;
    $scope.followCountMonth = 300;
    $scope.followCountToday = 25;
    $scope.rejectedContactMonth = 50;
    $scope.rejectedContactToday = 17;
    $scope.callToday = 80;
    $scope.callMonthly = 1900;
    $scope.notRespondToday = 60;
    $scope.notRespondMonth = 60;
});
/*=============================================================================================
                                    angularjs - end
==============================================================================================*/