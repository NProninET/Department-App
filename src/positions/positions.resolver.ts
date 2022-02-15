import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { PositionsService } from "./positions.service";
import { Position } from "./models/positions.model";
import { CreatePositionInput } from "./inputs/create-position.input";
import { UpdatePositionInput } from "./inputs/update-position.input";
import { PositionBase } from "./models/positions-base.model";

@Resolver(() => Position)
export class PositionsResolver {
    constructor(private readonly positionsService: PositionsService) {}

    @Mutation(() => PositionBase, {name: 'createPosition'})
    createPosition(@Args('input') createPositionInput: CreatePositionInput): Promise<PositionBase> {
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

    @Mutation(() => PositionBase, {name: 'updatePosition'})
    updatePosition(@Args('input') input: UpdatePositionInput): Promise<PositionBase> {
        return this.positionsService.updatePosition(input)
    }

    @Mutation(() => Int, {name: 'removePosition'})
    removePosition(@Args('id') id: number):  Promise<number> {
        return this.positionsService.removePosition(id);
    }
}