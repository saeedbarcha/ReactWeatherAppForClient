from bs4 import BeautifulSoup as bs
import requests
import sys
import json

USER_AGENT = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36"
# US english
LANGUAGE = "en-US,en;q=0.5"


def get_weather_data(url):
    session = requests.Session()
    session.headers['User-Agent'] = USER_AGENT
    session.headers['Accept-Language'] = LANGUAGE
    session.headers['Content-Language'] = LANGUAGE
    html = session.get(url)
    # create a new soup
    soup = bs(html.text, "html.parser")
    # store all results on this dictionary
    result = {}
    # extract region
    result['region'] = soup.find("div", attrs={"id": "wob_loc"}).text
    # extract temperature now
    result['temp_now'] = soup.find("span", attrs={"id": "wob_tm"}).text
    # get the day and hour now
    result['dayhour'] = soup.find("div", attrs={"id": "wob_dts"}).text
    # get the actual weather
    result['weather_now'] = soup.find("span", attrs={"id": "wob_dc"}).text
    # get the precipitation
    result['precipitation'] = soup.find("span", attrs={"id": "wob_pp"}).text
    # get the % of humidity
    result['humidity'] = soup.find("span", attrs={"id": "wob_hm"}).text
    # extract the wind
    result['wind'] = soup.find("span", attrs={"id": "wob_ws"}).text
    # get next few days' weather
    next_days = []
    days = soup.find("div", attrs={"id": "wob_dp"})
    for day in days.findAll("div", attrs={"class": "wob_df"}):
        # extract the name of the day
        try:
            day_name = day.find("div", attrs={"class": "vk_lgy"}).attrs['aria-label']
        except AttributeError:
            day_name = day.select_one('div[aria-label]').attrs['aria-label']
        # get weather status for that day
        weather = day.find("img").attrs["alt"]
        temp = day.findAll("span", {"class": "wob_t"})
        # maximum temparature in Celsius, use temp[1].text if you want fahrenheit
        max_temp = temp[0].text
        # minimum temparature in Celsius, use temp[3].text if you want fahrenheit
        min_temp = temp[2].text
        next_days.append({"name": day_name, "weather": weather, "max_temp": max_temp, "min_temp": min_temp})
    # append to result
    result['next_days'] = next_days
    return result


if __name__ == "__main__":
    URL = "https://www.google.com/search?lr=lang_en&ie=UTF-8&q=weather"
    regions = sys.argv[1:]
    weather_list = {
        "weather_data": []
    }
    for region in regions:
        weather_url = f"{URL}+{region.replace(' ', '+')}"
        data = get_weather_data(weather_url)
        weather_dict = {"region": region, "dayhour": data["dayhour"], "temp_now": data["temp_now"],
                        "precipitation": data["precipitation"], "humidity": data["humidity"], "wind": data["wind"],
                        "next_days": []}

        for dayweather in data["next_days"]:
            dayweather_dict = {
                "name": dayweather["name"],
                "description": dayweather["weather"],
                "max_temperature": dayweather['max_temp'],
                "min_temperature": dayweather['min_temp']
            }
            weather_dict['next_days'].append(dayweather_dict)
        weather_list["weather_data"].append(weather_dict)
    print(json.dumps(weather_list));    
    #with open("output.json", 'w') as f:
        #f.write(json.dumps(weather_list, indent=2))
