package com.server.dao;

import com.server.entity.play.PlayerPosition;
import com.server.entity.user.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface UserInfoDao {

    @Select("SELECT u.id , u.account, u.password FROM w_user u  WHERE u.account=#{account}")
    User getPlayerByAccount(String account);

    @Update("UPDATE w_user_position_info t set t.position_x=#{x},t.position_y=#{y} WHERE  " + "t.user_id=#{userId}")
    int updatePlayerPositionInfo(PlayerPosition position);


    @Insert("INSERT INTO w_user(account,password) values (#{account},#{password})")
    int addPlayerInfo(User user);

    @Insert("INSERT INTO w_user_position_info(user_id,position_x,position_y) values (#{userId},#{x},#{y})")
    int addPlayerPositionInfo(PlayerPosition position);

    @Select("SELECT um.user_id id,um.position_x x,um.position_y y FROM w_user_position_info um WHERE um.user_id=#{userId}")
    PlayerPosition findPlayerPositionInfo(PlayerPosition position);
}
