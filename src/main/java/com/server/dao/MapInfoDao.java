package com.server.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.server.entity.GameEvt;

@Mapper
public interface MapInfoDao {

	@Select("SELECT t.id,t.object_type type,t.object_x x,t.object_y y FROM w_object t")
	public List<GameEvt> getAllGameEvt();
}
