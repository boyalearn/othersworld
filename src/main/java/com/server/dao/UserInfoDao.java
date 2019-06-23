package com.server.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.server.entity.PlayerEvt;

@Mapper
public interface UserInfoDao {
	
	@Select("SELECT u.id,um.map_x x,um.map_y y "+
	    "FROM w_user u LEFT JOIN w_user_map um on u.id=um.user_id WHERE"+
	    "u.id=#{id}")
	public PlayerEvt getPlayerEvtById(Integer id);
	
	@Update("UPDATE w_user_map t set t.map_x=#{x},t.map_y=#{y} WHERE  "+
	    "t.user_id=#{id}")
	public int updatePlayerMapInfo(PlayerEvt player);
	
	
	// TODO
	@Update("UPDATE w_user t set t.map_x=#{x},t.map_y=#{y} WHERE  "+
		    "t.user_id=#{id}")
    public int updatePlayerInfo(PlayerEvt player);
}
