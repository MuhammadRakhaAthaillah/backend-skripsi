import { Body, Controller, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { WorkoutService } from './workout.service';

@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) { }

  @Get('all')
  async getAllUser() {
    return await this.workoutService.getAllUser()
  }

  @Get('equipments')
  async getAllEquipments() {
    return await this.workoutService.getAllEquipments()
  }

  @Get('workout-plan/:workout_per_week_id')
  async getWorkoutPlan(@Param('workout_per_week_id') workout_per_week_id: string) {
    return await this.workoutService.getWorkoutPlan(+workout_per_week_id)
  }

  @Get('user/:user_id')
  async getWorkoutByUser(@Param('user_id') user_id:string){
    return await this.workoutService.getUserWorkouts(+user_id)
  }

  @Get('detail/:workout_id')
  async getWorkoutDetail(@Param('workout_id') workout_id:string){
    return await this.workoutService.getWorkoutById(+workout_id)
  }

  @Get('equipment/get/:user_id')
  async getEquipment(@Param('user_id') user_id: string) {
    return await this.workoutService.getUserEquipment(+user_id)
  }

  @Get('progress/get/:userId')
  async getProgressByUser(@Param('userId') userId: string) {
    const progress = await this.workoutService.getProgressByUser(+userId);
    return {
      statusCode: 200,
      message: 'User progress retrieved successfully',
      data: progress,
    };
  }

  // @Post('create')
  // async createUser(@Body() body: { name: string, height: number; weight: number; equipments: number[]; days_available: number[]; minutes_available: number[] }) {
  //   return await this.workoutService.createUser(body);
  // }

  @Post('generate/:user_id')
  @HttpCode(200)
  async generateWorkout(@Param('user_id') user_id: string) {
    return await this.workoutService.makeWorkoutPlanForUser(+user_id)
  }
  @Post('generate-v2/:user_id')
  @HttpCode(200)
  async generateWorkoutV2(@Param('user_id') user_id: string) {
    return await this.workoutService.generateWorkoutPlan(+user_id)
  }

  @Post('create')
  @HttpCode(200)
  async createProgress(@Body() progressInput: {
    user_id: number;
    workout_id: number;
    date: Date;
    exercises: {
      workout_exercise_id: number;
      sets: number;
      reps: number;
      weight_used?: number;
      level_done?: number;
    }[];
  }) {
    const progress = await this.workoutService.createProgress(progressInput);
    return {
      statusCode: 201,
      message: 'Progress recorded successfully',
      data: progress,
    };
  }

  @Get('today/:userId')
  async getWorkoutForToday(@Param('userId') userId: string) {
    const workout = await this.workoutService.getWorkoutForToday(+userId);
    return {
      statusCode: 200,
      message: 'Workout for today retrieved successfully',
      data: workout,
    };
  }

  @Put('equipment/edit')
  async editEquipmentAvailabilities(
    @Body() body: {
      user_id: number,
      equipment_id: Array<number>,
    }
  ) {
    return await this.workoutService.editEquipmentAvailabilities(body)
  }
  @Put('days/edit')
  async editDaysAvailable(
    @Body() body: {
      user_id: number,
      days_available: Array<string>,
      minutes_available: Array<number>
    }
  ) {
    return await this.workoutService.editDaysAvailable(body)
  }

}
