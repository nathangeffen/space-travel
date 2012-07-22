/*    
   This file implements the Traveler class. It manages the time and
   length dilation form and calculates time and length dilations.
*/

/* Constants of speed and distance. */
SPEED_OF_LIGHT = 299792458;
SPEED_OF_LIGHT_SQUARED = 89875517873681760;
ASTRONOMICAL_UNIT = 149598000000;
LIGHT_MINUTE = 17987547480;
LIGHT_YEAR = 9460730472580800;
PARSEC = 30856780000000000;


function Traveler(form) {

    /* 
       This data structure is parsed by the main loop of the programme to 
       generate the calculator form and carry out the calculations.
    */

    this.fields = {
        distance : 
        {
            lbl :  "Distance",
            value : "",
            calc: calcTotalDistance,
            parameters : ["observer_time", "acceleration"],
            units: 
            {
                "meters": 1, 
                "kilometers": 1000, 
                "light-seconds": SPEED_OF_LIGHT, 
                "light-minutes": LIGHT_MINUTE,
                "astronomical unit" : ASTRONOMICAL_UNIT,
                "light-years": LIGHT_YEAR,
                "parsec" : PARSEC
            },
            ajaxValues : "distances",
            changed : false,
            set : false,
            primary : true,
            min_val : 100,
            min_error : "This calculator is quite useless for such small distances. Try travel a bit further.",
            help_text : true
        },
        acceleration : 
        {
            lbl : "Acceleration",
            value : "",
            calc: calcAcceleration,
            parameters : ["distance", "observer_time", "max_velocity"],
            max_missing : 1,
            units: 
            {
                "m/s^2" : 1,
                "g" : 9.8
            },
            changed : false,
            set : false,
            primary : true,
            min_value : 0.00000000000000001,
            min_error : "Distance too small.",
            max_val : SPEED_OF_LIGHT - 0.001,
            max_error : "Is your spaceship on steroids? You can't accelerate so quickly.",
            def_val : "9.8",
            help_text : true
        },
        max_velocity : 
        {
            lbl : "Maximum velocity",
            value : "",
            calc : calcMaxVelocity,
            parameters : ["acceleration", "observer_time"],
            units : 
            {
                "kilometers per hour" : 0.27777777777777777777,
                "meters per second" : 1,
                "kilometers per second" : 1000,
                "speed of light" : SPEED_OF_LIGHT
            },
            ajaxValues : "velocities",
            changed : false,
            set : false,
            primary : false,
            min_val : 0.000000000000001,
            min_error : "Your velocity is too small. At this rate you won't get out your front door.",
            max_val : SPEED_OF_LIGHT - 0.001,
            max_error : "You have been watching too much Star Trek. Velocity must be less than the speed of light.",
            help_text : true
        },
        observer_time : 
        {
            lbl : "Observer time elapsed during journey",
            value : "",
            calc : calcObserverTime,
            parameters : ["acceleration", "distance"],
            units : 
            {
                "seconds" : 1,
                "minutes" : 60,
                "hours" : 3600,
                "days" : 86400,
                "months" : 2629800,
                "years" : 31557600
            },
            changed : false,
            set : false,
            primary : false,
            help_text : true
        },
        traveler_time : 
        {
            lbl : "Traveler time elapsed during journey",
            value : "",
            calc : calcTotalTravelerTime,
            parameters : ["acceleration", "distance"],
            units : 
            {
                "seconds" : 1,
                "minutes" : 60,
                "hours" : 3600,
                "days" : 86400,
                "months" : 2629800,
                "years" : 31557600
            },
            changed : false,
            set : false,
            primary : false,
            help_text : true
        },
        spacecraft_mass :
        {
            lbl : "Spacecraft mass at launch",
            value : "",
            calc : null,
            units : 
            {
                "grams" : 0.001,
                "kilograms" : 1,
                "tons" : 1000
            },
            changed : false,
            set : false,
            primary : true,
            def_val : "2000000",
            help_text : true
        },
        energy : 
        {
            lbl : "Energy",
            value : "",
            calc : calcEnergy,
            parameters : ["max_velocity", "spacecraft_mass"],
            units : 
            {
                "joules" : 1,
                "btu" : 1055.055853,
                "kilowatthours" : 3599999.99712,
                "megajoules" : 1000000,
                "exajoules" : 1000000000000000000 
            },
            changed : false,
            set : false,
            primary : false,
            help_text : true
        },
        fuel_conversion_rate : 
        {
            lbl : "Fuel conversion rate",
            value : "",
            calc : calcFuelConversionRate,
            parameters : ["energy", "fuel_mass"],
            units :
            {
                "kg x m x m" : 1
            },
            ajaxValues : "fuelrates",
            changed : false,
            set : false,
            primary : true,
            def_val : "0.008",
            help_text : true
        },
        fuel_mass : 
        {
            lbl : "Fuel mass",
            value : "",
            calc : calcFuelMass,
            parameters : ["energy", "fuel_conversion_rate"],
            units :
            {
                "kg" : 1,
                "tons" : 1000
            },
            changed : false,
            set : false,
            primary : false,
            help_text : true
        },
        traveler_length : 
        {
            lbl : "Length of spacecraft at start of journey",
            value : "",
            calc : calcTravelerLength,
            parameters : ["observer_length", "max_velocity"],
            units : 
            {
                "meters" : 1,
                "millimeters" : 1/100,
                "centimeters" : 1/10,
                "kilometers" : 1000
            },
            changed : false,
            set : false,
            primary : true,
            def_val : 1,
            help_text : true
        },
        observer_length : 
        {
            lbl : "Shortest length of spacecraft for observer",
            value : "",
            calc : calcMinObserverLength,
            parameters : ["traveler_length", "max_velocity"],
            units : 
            {
                "meters" : 1,
                "millimeters" : 1/100,
                "centimeters" : 1/10,
                "kilometers" : 1000
            },
            changed : false,
            set : false,
            primary : false,
            help_text : true
        }
    };
    
    for (field in this.fields) {
        for (unit in this.fields[field].units) {
            if (this.fields[field].units[unit] == 1) {
                this.fields[field].current_unit = unit;
                break;
            }
        }
    }
    this.num_undefined = 0;
};



/* The processInput function gets the values of all the fields and 
   determines how many have not been set. 
*/

Traveler.prototype.processInput = function() {
    clearErrorMessage();
    this.num_undefined = 0;
    
    for (field in this.fields) {
        this.fields[field].set = false;
        if (document.getElementById(field).value) {
            this.fields[field].value = 
            document.getElementById(field).value 
                * this.fields[field].units[this.fields[field].current_unit];

            if (this.fields[field].hasOwnProperty('max_val') &&
                this.fields[field].value > this.fields[field].max_val) {
                if (this.fields[field].hasOwnProperty('max_error')) {
                    throw(this.fields[field].max_error);
                }
            }
            if (this.fields[field].hasOwnProperty('min_val') &&
                this.fields[field].value < this.fields[field].min_val) {
                if (this.fields[field].hasOwnProperty('min_error')) {
                    throw(this.fields[field].min_error);
                }
            }

        } else {
            this.fields[field].value = "";
            ++this.num_undefined;
        };
    };
};

/* The processOutput function creates the traveler form fields and sets 
   them to there calculated values. 
*/

Traveler.prototype.processOutput = function() {

    var html_snippet = "";

    for (field in this.fields) {
        if (this.fields[field].value == "") {
            if (this.fields[field].hasOwnProperty('def_val')) {
                this.fields[field].value = this.fields[field].def_val;
                value = this.fields[field].def_val;
            } 
            else {
                value = "";
            }
        } else {
            value = this.fields[field].value  
                / this.fields[field].units[this.fields[field].current_unit];
        }

        html_snippet  += '<div class="form-line">'
            + '<label for="' 
            + field + '">' + this.fields[field].lbl + '</label>'
            + '<input id="' + field +'" type="text" value="' 
            + value + '" '
            + 'onchange="Traveler.prototype.setChanged(this, traveler)"'
            + 'onkeyup="Traveler.prototype.keyup(this, traveler)"'
            + '></input>';

        html_snippet += '<select id="' + field + '-units"' + 
            'onchange="Traveler.prototype.updateMetric(this, traveler)"' + '>';
        for (unit in this.fields[field].units) {
            html_snippet += '<option ';
            if(this.fields[field].current_unit == unit) {
                html_snippet += 'selected="selected"';
            }
            html_snippet += '>' + unit + '</option>';
        }
        html_snippet += "</select>" 
        if (this.fields[field].help_text) {
            if (document.getElementById("help-"+field)) {
                html_snippet += '&nbsp;<span '
                html_snippet += 'id="help-symbol-' + field + '" ';
                html_snippet += 'class="help-symbol" ';
                html_snippet += 'onclick="toggleVisibility(';
                html_snippet += "'help-" + field + "',";
                html_snippet += "'help-symbol-" + field + "'";
                html_snippet += ')">?+</span>';
            }
        }
        html_snippet += "</div>";
        if (this.fields[field].help_text) {
            html_snippet += '<div style="display:none;" class="help-text" '
            html_snippet += 'id="help-' + field + '">';
            var help_text_field = document.getElementById("help-"+field);
            if (help_text_field)
                html_snippet += help_text_field.innerHTML;
            html_snippet +='</div>';
        }
        document.getElementById("flds").innerHTML = html_snippet;
    }
    for (field in this.fields) 
        this.fields[field].changed = false;
    document.forms[0].elements[0].focus();
};


/* The calculate function gets all the input values and then
   calls the calculation function for the undefined or unchanged
   secondary fields. It iterates over the fields twice in case a 
   calculation on the first iteration of field x makes it possible 
   for field y to be calculated on the second iteration.
*/
Traveler.prototype.calculate = function() {
    try {
        this.processInput();
        do {
            changed = false;
            for (f in this.fields) {
                if (this.fields[f].set) continue;
                if (((!this.fields[f].value || 
                      (!this.fields[f].changed && !this.fields[f].primary) )) &&
                    this.fields[f].calc) {
                    var missing = 0;
                    var parameters = {};
                    for (i = 0; i < this.fields[f].parameters.length; i++) {
                        parm = this.fields[f].parameters[i]
                        if (this.fields[parm].value &&
                            (this.fields[parm].changed || 
                             this.fields[parm].primary || 
                             this.fields[parm].set)) {
                            parameters[parm] = this.fields[parm].value;
                        } else {
                            ++missing;
                        }
                    }
                    if ((this.fields[f].max_missing != undefined  &&
                         missing <= this.fields[f].max_missing) ||
                        (missing == 0) ) {
                        this.fields[f].set = true;
                        changed = true;
                        this.fields[f].value = this.fields[f].calc(parameters);
                    }
                }
                
            }
        } while (changed);
        this.processOutput();
    } catch(e) {
        setErrorMessage(e);
    }
};

/*
  Clears the calculator form and sets fields to their default values.
*/

Traveler.prototype.clear = function() 
{
    for (f in this.fields) {
        if (this.fields[f].def_val) {
            this.fields[f].value = this.fields[f].def_val;
        } else {
            this.fields[f].value = "";
        }
    }
    this.processOutput();
}

/*
  Called on onChange event for the form fields. Sets an indicator that
  the field has been changed.
*/
Traveler.prototype.setChanged = function(e, t) {
    t.fields[e.id].changed = true; 
}

/*
  Called on keyup of any field. If an onkeyup function exists for the
  field, it is invoked here.
*/

Traveler.prototype.keyup = function(e, t) {
    if (t.fields[e.id].ajaxValues) {
        Traveler.prototype.showFieldValues(e.value, 
                                           t, 
                                           e.id,
                                           t.fields[e.id].ajaxValues);
    }
}

/*
  This function implements an AJAX call to the server to allow the user
  to select values for the current field. 
*/

Traveler.prototype.showFieldValues = function(str, t, id, table) {
    var options = [];
    var alpha = /^([a-zA-Z ]+)/;

    if (alpha.test(str)==true) {
        if (window.XMLHttpRequest) {
            xmlhttp=new XMLHttpRequest();
        } else {
            return;
        }

        xmlhttp.onreadystatechange=function()
        {

            if (xmlhttp.readyState==4 && xmlhttp.status==200)
            {
                options = JSON.parse(xmlhttp.responseText);
                $( "#" +id ).autocomplete({ 
                    minLength: 0,
                    delay: 20,
                    select: function(event, ui) { 
                        unit = t.fields[id].current_unit;
                        denominator = t.fields[id].units[unit];
                        ui.item.value = ui.item.value / denominator;
                    },
		            source: options
	            });
            }
        };

        xmlhttp.open("GET","spacetravel.php?field=" + table +"&value="+str,true);
        xmlhttp.send();            
    };
}

/*
  This function is called when the user changes the metric of a form
  field. It recalculates the field's value.
*/

Traveler.prototype.updateMetric = function(e, t) {
    field = e.id.substring(0, e.id.lastIndexOf("-unit"));
    value = document.getElementById(field).value; 
    oldUnit = t.fields[field].current_unit; 
    t.fields[field].current_unit = e.value;

    if (value) {
        oldUnitValue = t.fields[field].units[oldUnit];
        newUnitValue = t.fields[field].units[e.value];
        document.getElementById(field).value = value * 
            oldUnitValue / newUnitValue;
    }
};


/* Calculation functions */

calcTotalDistance = function(parameters) {

    // maxVel = calcMaxVelocity(parameters);
    // numerator = SPEED_OF_LIGHT * maxVel * parameters["observer_time"];
    // lorentz = Math.sqrt(SPEED_OF_LIGHT_SQUARED - maxVel * maxVel);
    // result = numerator / (SPEED_OF_LIGHT + lorentz);
    // return result;

    savedObserverTimeElapsed = parameters["observer_time_elapsed"];
    parameters["observer_time_elapsed"] = parameters["observer_time"];
    result = calcDistance(parameters);
    parameters["observer_time_elapsed"] = savedObserverTimeElapsed;
    return result;
};

calcDistance = function(parameters) {
    calcDist = function(observerTime, velocity) {
        // Formula from: 
        // http://www.mrelativity.net/MBriefs/Most%20Direct%20Derivation%20of%20Relativistic%20Constant%20Acceleration%20Distance%20Formula.htm
        // Which is:
        // distance = c*max_vel*T_obs / c + sqrt(c^2-max_vel^2)

        numerator = SPEED_OF_LIGHT * velocity * observerTime;
        lorentz = Math.sqrt(
            SPEED_OF_LIGHT_SQUARED - velocity * velocity);
        result = numerator / (SPEED_OF_LIGHT + lorentz);
        return result;        
    }
    savedObserverTimeElapsed = parameters["observer_time_elapsed"];
    if (parameters["observer_time_elapsed"] > parameters["observer_time"] / 2) {
        totalDistance = calcDist(parameters["observer_time"], 
                                   calcMaxVelocity(parameters));
        parameters["observer_time_elapsed"] = parameters["observer_time"] - 
            parameters["observer_time_elapsed"];
        velocity = calcVelocity(parameters);
        subtractDistance = calcDist(parameters["observer_time_elapsed"],
                                    velocity);
        result =  totalDistance - subtractDistance;
    } else {
        result = calcDist(parameters["observer_time_elapsed"],
                        calcVelocity(parameters));
    }
    parameters["observer_time_elapsed"] = savedObserverTimeElapsed;
    return result;
}

calcAcceleration = function(parameters) {
    setErrorMessage("The acceleration is calculated using Newtonian equations and is inaccurate when velocity approaches speed of light. It is better to input the acceleration yourself.");

    if (parameters["distance"] && parameters["observer_time"]) {
        distance = parameters["distance"] / 2;
        time = parameters["observer_time"] / 2;
        result = 2 * distance / (time * time);
    } else if (parameters["distance"] && parameters["max_velocity"]) {
        result = (parameters["max_velocity"] * parameters["max_velocity"]) /
            parameters["distance"];
    } else {
        result = 2 * parameters["max_velocity"] / parameters["observer_time"];
    }
    return result;
}


calcMaxVelocity = function(parameters) {
    savedObserverTimeElapsed = parameters["observer_time_elapsed"];
    parameters["observer_time_elapsed"] = parameters["observer_time"] / 2;
    result = calcVelocity(parameters);
    parameters["observer_time_elapsed"] = savedObserverTimeElapsed;
    return result;
}

calcVelocity = function(parameters) {
    observedTimeElapsed = parameters["observer_time_elapsed"];
    if (observedTimeElapsed > parameters["observer_time"] / 2) {
        observedTimeElapsed = parameters["observer_time"] - observedTimeElapsed;
    }
    observedTimeProportion = observedTimeElapsed / parameters["observer_time"];

    timeProportionSq = 1 / (observedTimeProportion * observedTimeProportion);

    k = SPEED_OF_LIGHT_SQUARED / parameters["acceleration"];
    denominator = parameters["acceleration"] * 
        parameters["observer_time"] * parameters["observer_time"] / timeProportionSq;
    second_sqrt_term = k / denominator;
    sqrt_term = 1 + second_sqrt_term;
    result = SPEED_OF_LIGHT / Math.sqrt(sqrt_term);
    return result;    
}

calcObserverTime = function(parameters) {
    k = SPEED_OF_LIGHT_SQUARED / parameters["acceleration"];
    k_over_a = k / parameters["acceleration"];
    sqrt_term_operand = parameters["distance"] / (2 * k) + 1;
    sqrt_term_operand = sqrt_term_operand * sqrt_term_operand;
    sqrt_term = k_over_a * (sqrt_term_operand - 1);
    result = 2 * Math.sqrt(sqrt_term);
    return result;
}

calcTotalTravelerTime = function(parameters)
{
    k = SPEED_OF_LIGHT_SQUARED / parameters["acceleration"];
    acosh_result = acosh(parameters["distance"] / (2 * k)  + 1);
    result = 2 * SPEED_OF_LIGHT / parameters["acceleration"] * acosh_result;
    return result;
}

calcTravelerTime = function(parameters) 
{
    result = parameters["observer_time_elapsed"] * 
            Math.sqrt(1 - 
                      parameters["velocity"] * 
                      parameters["velocity"] / 
                      SPEED_OF_LIGHT_SQUARED); 
    return result;
}

calcEnergy = function(parameters)
{
    vel_over_c_sq = parameters["max_velocity"] * 
        parameters["max_velocity"] / SPEED_OF_LIGHT_SQUARED;
    sqrt_term = 1 - vel_over_c_sq;
    denominator = Math.sqrt(sqrt_term);
    energy_per_kg = 2 * SPEED_OF_LIGHT_SQUARED * ((1 / denominator) - 1);
    result = parameters["spacecraft_mass"] * energy_per_kg;
    return result;
}

calcFuelConversionRate = function(parameters) 
{
    return parameters["energy"] / (parameters["fuel_mass"] * SPEED_OF_LIGHT_SQUARED);
}

calcFuelMass = function(parameters)
{
    return parameters["energy"] / (parameters["fuel_conversion_rate"] * SPEED_OF_LIGHT_SQUARED);
}

calcMinObserverLength = function(parameters) {
    velocity_sq = parameters["max_velocity"] * parameters["max_velocity"];
    result =  parameters["traveler_length"] * 
        Math.sqrt(1 - velocity_sq / SPEED_OF_LIGHT_SQUARED);
    return result;
}

calcObserverLength = function(parameters) {    
    velocity_sq = parameters["velocity"] * parameters["velocity"];
    result =  parameters["traveler_length"] * 
        Math.sqrt(1 - velocity_sq / SPEED_OF_LIGHT_SQUARED);
    return result;
}


calcTravelerLength = function(parameters) {    
    velocity_sq = parameters["max_velocity"] * parameters["max_velocity"];    
    result =  parameters["observer_length"] / 
        Math.sqrt(1 - velocity_sq /  SPEED_OF_LIGHT_SQUARED);
    return result;
}

function acosh (arg) {
    // Returns the inverse hyperbolic cosine of the number, 
    // i.e. the value whose hyperbolic cosine is number  
    // 
    // version: 1109.2015
    // discuss at: http://phpjs.org/functions/acosh    
    // +   original by: Onno Marsman
    // *     example 1: acosh(8723321.4);
    // *     returns 1: 16.674657798418625
    // Source: http://phpjs.org/functions/acosh:302
    return Math.log(arg + Math.sqrt(arg * arg - 1));
}

/*
  Puts an error message in the error id selector.
*/
setErrorMessage = function(str) 
{
    document.getElementById("error").innerHTML += "<p>" + str + "</p>";
};

/*
  Removes all error messages in the error id selector.
*/

clearErrorMessage = function(str)
{
    document.getElementById("error").innerHTML = "";
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}


/* Toggles the visibility of a DOM element */
toggleVisibility = function(text, help) {
    if (document.getElementById(text).style.display == "none") {
        document.getElementById(text).style.display="block";
        document.getElementById(help).innerHTML = "?-";
    } else {
        document.getElementById(text).style.display="none";    
        document.getElementById(help).innerHTML = "?+";
    }
}
