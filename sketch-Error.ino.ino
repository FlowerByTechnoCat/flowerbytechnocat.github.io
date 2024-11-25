 #include <ESP8266WiFi.h> 
#include <ESP8266WebServer.h>
/*#include <Adafruit_NeoPixel.h>
Adafruit_NeoPixel strip = Adafruit_NeoPixel(11, D7, NEO_GRB + NEO_KHZ800);
Adafruit_NeoPixel pixel = Adafruit_NeoPixel(1, D6, NEO_GRB + NEO_KHZ800);*/
/* Установите здесь свои SSID и пароль */
const char* ssid = "HUAWEI-XB72";  // SSID
const char* password = "48575443B2C9B79A"; 
const char* ssid1 = "BBB";  // SSID
const char* password1 = "@.w0--!mos";// пароль
// Объект веб-сервера. Будет прослушивать порт 80 (по умолчанию для HTTP)
ESP8266WebServer server(10200); 
bool centerIsOff = 0;  

void setup() 
{
  
  // подключиться к вашей локальной wi-fi сети
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  // проверить, подключился ли wi-fi модуль к wi-fi сети
  while (WiFi.status() != WL_CONNECTED) 
  {
    delay(1000);
  }
  /*server.on("/genericArgs", handleGenericArgs);  // привязать функцию обработчика к URL-пути
  server.on("/specificArgs", handleSpecificArg);*/
  
  server.on("/flower/data",HTTP_POST, handledata);// привязать функцию обработчика к URL-пути
  server.begin();                                // запуск сервера
  /*strip.begin(); 
  pixel.begin();// начинаем 
 /* strip.setPixelColor(1,255,255,255);
  strip.setPixelColor(8,255,255,255);
  strip.setPixelColor(9,255,255,255);/// делаем яркость 25 (максимум 254)
  pixel.setPixelColor(0,0,0,0);//иначе он зеленый
  strip.show(); 
  pixel.setPixelColor(0,0,255,0);
  pixel.show(); 
  strip.setBrightness(250);
  pixel.setBrightness(250);*/
   

}

void loop() 
{
  server.handleClient(); 
  // обработка входящих запросов

}

void handledata()
{
  Serial.println("Success0");
   String message = "Number of args received:";
  message += server.args();      // получить количество параметров
  message += "\n";               // переход на новую строку
    for (int i = 0; i < server.args(); i++) 
  {
    message += "Arg n" + (String)i + " –> "; // добавить текущее значение счетчика
    message += server.argName(i) + ": ";      // получить имя параметра
    message += server.arg(i) + "\n";          // получить значение параметра
  }
  /*if ((server.arg("red")== "")||(server.arg("green")== "")||(server.arg("blue")== ""))
  {
    return;
  }
  else
  {
    uint8_t r = server.arg("red").toInt();
    uint8_t g = server.arg("green").toInt();
    uint8_t b = server.arg("blue").toInt();
    if((r+b+g)==0)  centerIsOff = 1;
    else centerIsOff = 0;
    pixel.setPixelColor(0,r,g,b);
    Serial.println("Success1"); 
  }
  for(int i = 0; i<11; i++)
  {
    
    uint8_t r = server.arg(i*10+1).toInt();
    uint8_t g = server.arg(i*10+2).toInt();
    uint8_t b = server.arg(i*10+3).toInt();
    strip.setPixelColor(i,r,g,b);
  }
  Serial.println("Success2");
      pixel.show();
      strip.show();
      Serial.println("Success3");*/
}
/*void testfunc()
{
  server.send(200, "text/html", "<!DOCTYPE html><html><head><title>Меня увидешь в шапке вкладки браузера</title><meta charset='utf-8'></head><body><h1>Реально Большой привет от esp8266!)))</h1></body></html>");
}

/*void handleGenericArgs() //обработчик
{
  String message = "Number of args received:";
  message += server.args();      // получить количество параметров
  message += "\n";               // переход на новую строку

  for (int i = 0; i < server.args(); i++) 
  {
    message += "Arg n" + (String)i + " –> "; // добавить текущее значение счетчика
    message += server.argName(i) + ": ";      // получить имя параметра
    message += server.arg(i) + "\n";          // получить значение параметра
  } 

  server.send(200, "text/plain", message);    // ответить на HTTP запрос
}
void handleSpecificArg() 
{ 
  String message = "";

  if (server.arg("Temperature")== "") 
  { // параметр не найден
    message = "Temperature Argument not found";
  }
  else
  { // параметр найден
    message = "Temperature Argument = ";
    message += server.arg("Temperature");     // получить значение параметра запроса
  }

  server.send(200, "text/plain", message);    // возвращаем HTTP-ответ
}*/
