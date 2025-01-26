import { getMockCreep } from "../mock/Creep";

describe("main", () => {
  it("全局环境测试", () => {
    expect(Game).toBeDefined();

    expect(_).toBeDefined();

    expect(Memory).toMatchObject({ rooms: {}, creeps: {} });
  });

  it("mock Creep 可以正常使用", () => {
    // 创建一个 creep 并指定其属性
    const creep = getMockCreep({ name: "test", ticksToLive: 100 });

    expect(creep.name).toBe("test");
    expect(creep.ticksToLive).toBe(100);
  });
});
