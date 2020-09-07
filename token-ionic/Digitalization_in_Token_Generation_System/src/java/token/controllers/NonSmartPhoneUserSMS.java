/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package token.controllers;

import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

/**
 *
 * @author SHREE
 */
public class NonSmartPhoneUserSMS
{

    public static void main(String[] args)
    {
        String recipient = "7057627655";
        String message = "Hello User!!!!";
//                        String username = "nehankulkarni19@gmail.com:123456";
//                        String password = "123456";
//                        String originator = "918329898139";
        sendSMS(message, recipient);
    }

    public static void sendSMS(String message, String recipient)
    {
        try
        {
            message = URLEncoder.encode(message, "UTF-8");

//                        String requestUrl  = "http://api.mVaayoo.com/mvaayooapi/MessageCompose?" +
//            "username=" + URLEncoder.encode(username, "UTF-8") +
//            "&password=" + URLEncoder.encode(password, "UTF-8") +
//            "&recipient=" + URLEncoder.encode(recipient, "UTF-8") +
//            "&messagetype=SMS:TEXT" +
//            "&messagedata=" + URLEncoder.encode(message, "UTF-8") +
//            "&originator=" + URLEncoder.encode(originator, "UTF-8") +
//            "&serviceprovider=GSMModem1" +
//            "&responseformat=html";
            String requestUrl = "http://api.mVaayoo.com/mvaayooapi/MessageCompose?user=nehankulkarni19@gmail.com:123456&senderID=TEST+SMS&receipientno=" + recipient + "&msgtxt=" + message + "&state=4";

            URL url = new URL(requestUrl);
            HttpURLConnection uc = (HttpURLConnection) url.openConnection();

            System.out.println(uc.getResponseMessage());
            System.out.println("In try");

            uc.disconnect();

        } catch (Exception ex)
        {
//            System.out.println(ex.getMessage());
            ex.printStackTrace();
        }
    }
}
