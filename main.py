from bs4 import BeautifulSoup
import requests
import webbrowser
from selenium import webdriver
import time


# Получение расписания группы
def get_schedule4group(group, drive):
    enter_group = drive.find_element_by_id(group)
    enter_group.click()
    time.sleep(1)
    with open("page.html", "w", encoding='utf-8') as file:
        file.write(drive.page_source)
        # ...
    pass


# Полученеи списка всех факультетов
def get_all_buttons_faq(file):
    contents = file.read()
    soup = BeautifulSoup(contents, 'lxml')
    faculty_button_list = [tag['id'] for tag in soup.select('div[id]')]
    faculty_button_list = list(filter(lambda x: x[0].lower() in 'b', faculty_button_list))
    faculty_button_list.remove('banner')
    return faculty_button_list


# Получение списка групп для факультета
def get_all_group_list(file, driver):
    content = file.read()
    soup = BeautifulSoup(content, 'lxml')
    group_btn_list = [tag['id'] for tag in soup.select('button[id]')]
    group_btn_list = list(filter(lambda x: x[0].lower() in 'g', group_btn_list))
    prev_url = driver.current_url
    for group_btn in group_btn_list:
        driver.get(url=prev_url)
        get_schedule4group(group_btn, driver)


# Основная функция получения информации
def get_data_selenium(url):
    try:
        driver = webdriver.Chrome(
            executable_path="chromedriver.exe",
        )
        driver.get(url=url)
        enter_guest = driver.find_element_by_id("guest")
        enter_guest.click()
        time.sleep(2)
        with open("page.html", "w", encoding='utf-8') as file:
            file.write(driver.page_source)
        with open("page.html", "r", encoding='utf-8') as f:
            faculty_button_list = get_all_buttons_faq(f)
        for btn in faculty_button_list:
            driver.get(url=url)
            fq_btn = driver.find_element_by_id(btn)
            fq_btn.click()
            time.sleep(2)
            with open("page.html", "w", encoding='utf-8') as file:
                file.write(driver.page_source)
            with open("page.html", "r", encoding='utf-8') as f:
                get_all_group_list(f, driver)
    except Exception as ex:
        print(ex)
    finally:
        driver.close()
        driver.quit()


if __name__ == "__main__":
    base_url = 'https://tt.chuvsu.ru'
    get_data_selenium(base_url)
