
import { LambertShader, Material, RendererType, RenderShader } from '..';
import { ShaderLib } from '../assets/shader/ShaderLib';
import { Engine3D } from '../Engine3D';
import { Texture } from '../gfx/graphics/webGpu/core/texture/Texture';
import { Color } from '../math/Color';
import { Vector4 } from '../math/Vector4';

import { registerMaterial } from "./MaterialRegister";

/**
 * Lambert Mateiral
 * A non glossy surface material without specular highlights.
 * @group Material
 */
export class LambertMaterial extends Material {
    /**
     * @constructor
     */
    constructor() {
        super();
        let colorPass = new RenderShader(`LambertShader`, `LambertShader`);
        colorPass.setShaderEntry(`VertMain`, `FragMain`)

        colorPass.setUniformVector4(`transformUV1`, new Vector4(0, 0, 1, 1));
        colorPass.setUniformVector4(`transformUV2`, new Vector4(0, 0, 1, 1));
        colorPass.setUniformColor(`baseColor`, new Color(1, 1, 1, 1));
        colorPass.setUniformFloat(`alphaCutoff`, 0.5);
        let shaderState = colorPass.shaderState;
        shaderState.acceptShadow = false;
        shaderState.castShadow = false;
        shaderState.receiveEnv = false;
        shaderState.acceptGI = false;
        shaderState.useLight = false;

        // let shaderState = shader.shaderState;
        // shaderState.acceptShadow = true;
        // shaderState.castShadow = true;
        // shaderState.receiveEnv = false;
        // shaderState.acceptGI = false;
        // shaderState.useLight = true;

        // default value
        // this.baseMap = Engine3D.res.whiteTexture;
        // this.emissiveMap = Engine3D.res.blackTexture;
        this.defaultPass = colorPass;
        this.baseMap = Engine3D.res.grayTexture;
    }

    /**
     * set base color map texture
     */
    set baseMap(tex: Texture) {
        this.defaultPass.setTexture(`baseMap`, tex);
    }

    /**
     * get base color map texture
     */
    get baseMap() {
        return this.defaultPass.getTexture(`baseMap`);
    }

    /**
     * set base color (tint color)
     */
    set baseColor(color: Color) {
        this.defaultPass.setUniformColor(`baseColor`, color);
    }

    /**
     * get base color (tint color)
     */
    get baseColor() {
        return this.defaultPass.uniforms[`baseColor`].color;
    }

    /**
     * set environment texture, usually referring to cubemap
     */
    public set envMap(texture: Texture) {
        //not need env texture
    }

    /**
     * @internal
     * set shadow map
     */
    public set shadowMap(texture: Texture) {
        //not need shadowMap texture
    }

}