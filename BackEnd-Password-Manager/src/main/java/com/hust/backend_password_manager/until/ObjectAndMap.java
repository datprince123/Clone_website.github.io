package com.hust.backend_password_manager.until;

import lombok.extern.slf4j.Slf4j;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

@Slf4j
public  class ObjectAndMap {

    private ObjectAndMap() {
        throw new IllegalStateException("Utility class");
    }
    public static Map<String, Object> objectToMap(Object object)  {
        Map<String, Object> map = new HashMap<>();
        Field[] fields = object.getClass().getDeclaredFields();
        try {
            for (Field field: fields) {
                map.put(field.getName(),  field.get(object));
            }
        }catch (IllegalArgumentException | IllegalAccessException e){
            e.printStackTrace();
        }

        return map;
    }

}
