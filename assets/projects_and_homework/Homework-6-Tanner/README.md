# Homework-6-Tanner
---
**NOTE TO GRADER**

The API authorization key (from https://www.weatherbit.io/) seems to go bad without reason or warning. I have just refreshed it and won't touch it again until grading is complete. Should it go bad in the interim, please let me know at matthew.j.tanner@gmail.com and I will correct it as quickly as possible. Thank you 

---
#### Synopsis: We were to create a browser application that allowed a user to view the weather conditions in different cities implemented with the use of a weather API.
## Implementation
### Implement HTML and CSS according to the mockup.
### Implement Javascript
#### Onload
##### 1. Initialize look an feel to initial state.
##### 2. Load searches from previous session from brower storage into previous session buttons.
##### 3. Implement input fields and event listeners:
###### - City name text input field
###### - Submit city name text input field button
###### - City name input field event listener
###### - City name input field submit button event listener
#### On 'Enter' keyed on city text input field or submit button clicked:
##### 1. Construct URL from user input.
##### 2. Call URL
##### 3. Test response validity. In invalid, bail.
##### 4. Parse response JSON.
##### 5. Fill appropiate feilds with data elements. 
###### - URL 1, Single Day Forecast
###### - cityName, validated
###### - temp
###### - wind
###### - humidity
###### - uv index (background color coded according to NWS standard.)
!["UV Background Color Code"](./assets/images/uv_hazard_colorcode.png "UV Background Color Code")
###### - URL 2, Extended Forecast
###### - temp
###### - wind
###### - humidity
###### - weather code (for weather icon.)
## Acceptance Criteria
#### GIVEN a weather dashboard with form inputs
!["Acceptance  Criteria 1 Through 4"](./assets/images/ac_1.png "Acceptance  Criteria 1 Through 4") *Acceptance Criteria 1 - 4*
##### 1. **WHEN** I search for a city **THEN** I am presented with current and future conditions for that city and that city is added to the search history
##### 2. **WHEN** I view current weather conditions for that city **THEN** I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
##### 3. **WHEN** I view the UV index **THEN** I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
##### 4. **WHEN** I view future weather conditions for that city **THEN** I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
!["Acceptance  Criteria 5"](./assets/images/ac_2.png "Acceptance  Criteria 5") *Acceptance Criteria 5*
##### 5. **WHEN** I click on a city in the search history **THEN** I am again presented with current and future conditions for that city
## Further Work Needed 
##### 1. Implement 'nation' so that when we enter "Athens" intending "Athens, GA" we don't get "Athens, Greece."
##### 2. Implement previous search buttons so that if to eliminate repetitions - delete older copies of more recent searches. 
