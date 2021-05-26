package com.server.dao;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import com.server.entity.play.GameModel;

@Mapper
public interface SceneMapInfoDao {
    @Select("SELECT t.id,t.model_type type,t.position_x x,t.position_y y FROM w_scene_map_info t")
    List<GameModel> findAllGameModel();

    @Insert("insert into w_scene_map_info (model_type, position_x, position_y) values (#{type}, #{x} ,#{y})")
    @Options(useGeneratedKeys = true, keyProperty = "id", keyColumn = "id")
    Integer addGameModel(GameModel model);

}
