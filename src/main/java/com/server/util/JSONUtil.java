package com.server.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JSONUtil {

	private static final Logger LOGGER = LoggerFactory.getLogger(JSONUtil.class);

	// 定义jackson对象
	private static final ObjectMapper MAPPER = new ObjectMapper();

	/**
	 * 将对象转换成json字符串。
	 */
	public static String objectToJson(Object data) {

		try {
			String string = MAPPER.writeValueAsString(data);
			return string;
		} catch (JsonProcessingException e) {
			LOGGER.error(e.getMessage());
		}
		return null;

	}

	/**
	 * 将json结果集转化为对象
	 */
	public static <T> T jsonToPoJo(String jsonData, Class<T> beanType) {

		try {
			T t = MAPPER.readValue(jsonData, beanType);
			return t;
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		}
		return null;

	}

	/**
	 * 将json数据转换成pojo对象list
	 */
	public static <T> T jsonToList(String jsonData, TypeReference<T> typeReference) {

		try {
			return MAPPER.readValue(jsonData, typeReference);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		}
		return null;

	}

}
