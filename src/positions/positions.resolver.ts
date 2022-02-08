import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { PositionsService } from "./positions.service";
import { Position } from "./positions.model";
import { CreatePositionInput } from "./inputs/create-position.input";
import { UpdatePositionInput } from "./inputs/update-position.input";

@Resolver(() => Position)
export class PositionsResolver {
    constructor(private readonly positionsService: PositionsService) {}

    @Mutation(() => Position)
    createPosition(@Args('createPositionInput') createPositionInput: CreatePositionInput): Promise<Position> {
        return this.positionsService.createPosition(createPositionInput);
    }

    @Query(() => [Position], {name: 'positions'})
    findAll(): Promise<Position[]> {
        return this.positionsService.getAllPositions();
    }

    @Query(() => Position, {name: 'position'})
    findOne(@Args('id') id: number): Promise<Position> {
        return this.positionsService.getPositionById(id);
    }

    @Mutation(() => Position)
    updatePosition(@Args('updatePositionInput') updatePositionInput: UpdatePositionInput): Promise<Position> {
        return this.positionsService.updatePositionWithInput(updatePositionInput.id, updatePositionInput)
    }

    @Mutation(() => Int)
    removePosition(@Args('id') id: number):  Promise<number> {
        return this.positionsService.removePosition(id);
    }
}