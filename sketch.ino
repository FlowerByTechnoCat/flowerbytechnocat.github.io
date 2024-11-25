 #include <ESP8266WiFi.h> 
#include <ESP8266WebServer.h>
#include <Adafruit_NeoPixel.h>
uint8_t amount = 64; //количество светодиодов в ленте (или матрице)
Adafruit_NeoPixel strip = Adafruit_NeoPixel(amount, D7, NEO_GRB + NEO_KHZ800);

/* Установите здесь свои SSID и пароль */
const char* ssid = "HUAWEI-XB72";  // SSID
const char* password = "48575443B2C9B79A"; // пароль

// Объект веб-сервера. Будет прослушивать порт 80 (по умолчанию для HTTP)
ESP8266WebServer server(10200);   

void setup() 
{
  Serial.begin(115200);
  delay(100);

  Serial.println("Connecting to ");
  Serial.println(ssid);

  // подключиться к вашей локальной wi-fi сети
  WiFi.begin(ssid, password);

  // проверить, подключился ли wi-fi модуль к wi-fi сети
  while (WiFi.status() != WL_CONNECTED) 
  {
    delay(1000);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected..!");
  Serial.print("Got IP: ");  
  Serial.println(WiFi.localIP());

  /*server.on("/genericArgs", handleGenericArgs);  // привязать функцию обработчика к URL-пути
  server.on("/specificArgs", handleSpecificArg);*/
  /*server.on("/mychesssite", chesssite);*/
  server.on("/flower/data",HTTP_POST, handledata);// привязать функцию обработчика к URL-пути

  server.begin();                                // запуск сервера
  Serial.println("HTTP server started");  
  strip.begin();              // начинаем
  strip.setBrightness(25); 
  /*strip.setPixelColor(28,255,255,255);
 /* strip.setPixelColor(1,255,255,255);
  strip.setPixelColor(8,255,255,255);
  strip.setPixelColor(9,255,255,255);*/// делаем яркость 25 (максимум 254)
  strip.show();   

}

void loop() 
{
  server.handleClient(); 
  // обработка входящих запросов

}

/*
 * void chesssite()
{
String s = webpage;
server.send(200, "text/html", s);
if(server.args())
 {
    Serial.print(server.arg("plain"));
 }
}
*/

void handledata()
{
  /*for(int i = 0; i<server.args(); i++)
  {
    Serial.println(server.arg(i));
  }*/
  if (server.arg("type")== "color")
  {
  uint8_t red = server.arg("red").toInt();
  uint8_t green = server.arg("green").toInt();
  uint8_t blue = server.arg("blue").toInt();
  
  for(int i = 0; i<amount; i++)
{
  
  strip.setPixelColor(i,red,green,blue);
  

}
strip.show();
  }

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
